import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  account,
  account_roles,
  permissions,
  role_has_permissions,
  roles,
} from 'models';
import { Op } from 'sequelize';
import { updateSuccessResponse } from 'src/utils/updateSuccessResponse';
import { errorResponse } from 'src/utils/errorResponse';

@Injectable()
export class RolesService {
  async create(createRoleDto: any) {
    const inputData = {
      guard_name: 'api',
      name: createRoleDto.name,
      created_by: createRoleDto.user_id,
    };
    const data = await roles.create(inputData);
    for (let i = 0; i < createRoleDto.permissions.length; i++) {
      const element = createRoleDto.permissions[i];
      const permissionData = await permissions.findOne({
        where: {
          name: element,
        },
      });

      await role_has_permissions.create({
        role_id: data.id.toString(),
        permission_id: permissionData.id,
      });
    }

    return {
      status: 200,
      message: 'Data Berhasil di Hapus',
    };
    try {
    } catch (error) {
      return {
        status: 500,
        message: `Error: ${error}`,
      };
    }
  }

  async findAll(request: any) {
    const queryOptions: any = {};
    if (request.filter && request.q) {
      queryOptions[request.filter] = {
        [Op.iLike]: `%${request.q}%`,
      };
    }

    const data = await roles.findAll({
      include: [
        {
          model: role_has_permissions,
          include: [
            {
              model: permissions,
              attributes: ['name'],
            },
          ],
        },
      ],
      where: queryOptions,
    });

    const formattedData = await Promise.all(
      data.map(async (item) => {
        const createdBy = await account.findByPk(item.created_by, {
          attributes: ['nama'], // Ambil atribut 'nama' dari account yang membuat role
        });

        const updatedBy = await account.findByPk(item.updated_by, {
          attributes: ['nama'], // Ambil atribut 'nama' dari account yang memperbarui role
        });

        const permissions = [];

        for (let i = 0; i < item.role_has_permissions.length; i++) {
          const element = item.role_has_permissions[i];
          permissions.push(element.permission.name);
        }

        return {
          id: item.id,
          name: item.name,
          guard_name: item.guard_name,
          created_by: createdBy ? createdBy.nama : null,
          updated_by: updatedBy ? updatedBy.nama : null,
          permissions: permissions,
        };
      }),
    );

    const pageSize = 10;
    const page: number = +request.page;
    const offset = (page - 1) * pageSize;

    const totalCount = await roles.count();

    const totalPages = Math.ceil(totalCount / pageSize);
    const to = offset + data.length;

    return {
      data: formattedData,
      links: {
        first: `${process.env.APP_DOMAIN}/api/roles/filter?page=1`,
        last: `${process.env.APP_DOMAIN}/api/roles/filter?page=${totalPages}`,
        prev:
          page > 1
            ? `${process.env.APP_DOMAIN}/api/roles/filter?page=${page - 1}`
            : null,
        next:
          page < totalPages
            ? `${process.env.APP_DOMAIN}/api/roles/filter?page=${page + 1}`
            : null,
      },
      meta: {
        current_page: page,
        from: offset + 1,
        to: to,
        last_page: totalPages,
        total: totalCount,
        per_page: pageSize,
      },
    };
  }

  async findOne(id: number) {
    try {
      const data = await roles.findByPk(id, {
        include: [
          {
            model: role_has_permissions,
            include: [
              {
                model: permissions,
                attributes: ['name'],
              },
            ],
          },
        ],
      });

      if (!data) {
        return {
          status: 404,
          message: 'Role not found',
        };
      }

      const createdBy = data.created_by
        ? (
            await account.findByPk(data.created_by, {
              attributes: ['nama'],
            })
          )?.nama
        : null;

      const updatedBy = data.updated_by
        ? (
            await account.findByPk(data.updated_by, {
              attributes: ['nama'],
            })
          )?.nama
        : null;

      const permissionsDAta = data.role_has_permissions.map(
        (element) => element.permission.name,
      );

      return {
        status: 200,
        data: {
          id: data.id,
          name: data.name,
          guard_name: data.guard_name,
          created_by: createdBy,
          updated_by: updatedBy,
          permissions: permissionsDAta,
        },
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal Server Error: ' + error.message,
      };
    }
  }

  async update(id: number, updateRoleDto: any) {
    try {
      // return updateRoleDto;
      const dataRoles = {
        name: updateRoleDto.name,
      };

      const update = await roles.update(dataRoles, {
        where: {
          id,
        },
      });

      const deleteRolesHasPermissions = await role_has_permissions.destroy({
        where: {
          role_id: updateRoleDto.id,
        },
      });

      if (deleteRolesHasPermissions) {
        for (let i = 0; i < updateRoleDto.permissions.length; i++) {
          const element = updateRoleDto.permissions[i];
          const permissionData = await permissions.findOne({
            where: {
              name: element,
            },
          });

          await role_has_permissions.create({
            role_id: id.toString(),
            permission_id: permissionData.id,
          });
        }
      }

      if (update) {
        return updateSuccessResponse();
      }
    } catch (error) {
      return errorResponse(error);
    }
  }

  async remove(id: number) {
    try {
      const data = await roles.destroy({
        where: {
          id,
        },
      });
      if (data > 0) {
        return {
          status: 200,
          message: 'Data Berhasil di Hapus',
        };
      } else {
        return {
          status: 404,
          message: 'Role not found',
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Error : ' + error,
      };
    }
  }
}
