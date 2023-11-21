import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { account, permissions, role_has_permissions, roles } from 'models';
import { Op } from 'sequelize';

@Injectable()
export class PermissionsService {
  create(createPermissionDto: CreatePermissionDto) {
    return 'This action adds a new permission';
  }

  async findAll() {
    try {
      const data = await permissions.findAll();

      const formattedData = data.map((item) => ({
        id: item.id,
        name: item.name,
        guard_name: item.guard_name,
      }));

      return { data: formattedData };
    } catch (error) {
      return {
        status: 500,
        message: 'Error : ' + error,
      };
    }
  }

  async findOne(id: number) {
    const data = await permissions.findByPk(id, {
      include: [
        {
          model: role_has_permissions,
          include: [
            {
              model: roles,
            },
          ],
        },
      ],
    });

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

    const rolesDAta = data.role_has_permissions.map(
      (element) => element.role.name,
    );

    const formattedData = {
      id: data.id,
      name: data.name,
      guard_name: data.guard_name,
      created_at: data.created_at,
      updated_at: data.updated_at,
      created_by: createdBy,
      updated_by: updatedBy,
      roles: rolesDAta,
    };

    return formattedData;
  }

  private async formatResponse(
    data: any,
    queryOptions: any,
    page: number,
    pageSize: number,
    offset: number,
    basePath: string = '',
  ) {
    const totalCount = await permissions.count({ where: queryOptions });
    const totalPages = Math.ceil(totalCount / pageSize);
    const to = offset + data.length;
    return {
      data,
      links: {
        first: `${process.env.APP_DOMAIN}${basePath}?page=1`,
        last: `${process.env.APP_DOMAIN}${basePath}?page=${totalPages}`,
        prev:
          page > 1
            ? `${process.env.APP_DOMAIN}${basePath}?page=${page - 1}`
            : null,
        next:
          page < totalPages
            ? `${process.env.APP_DOMAIN}${basePath}?page=${page + 1}`
            : null,
      },
      meta: {
        current_page: page,
        from: offset + 1,
        to,
        last_page: totalPages,
        total: totalCount,
        per_page: pageSize,
      },
    };
  }

  async filterPermissions(request: any) {
    const pageSize = 10; // Jumlah item per halaman
    const page = request.page || 1; // Mendapatkan nomor halaman dari permintaan atau default ke halaman 1
    const offset = (page - 1) * pageSize;

    const queryOptions: any = {};

    if (
      request.filter &&
      request.filter !== null &&
      request.q &&
      request.q !== null
    ) {
      queryOptions[request.filter] = {
        [Op.iLike]: `%${request.q}%`,
      };
    }

    const data = await permissions.findAll({
      include: [
        {
          model: role_has_permissions,

          include: [
            {
              model: roles,
            },
          ],
        },
      ],
      where: queryOptions,
      limit: pageSize,
      offset,
    });

    const formattedData = await Promise.all(
      data.map(async (item) => {
        const createdBy = await account.findByPk(item.created_by, {
          attributes: ['nama'], // Ambil atribut 'nama' dari account yang membuat role
        });

        const updatedBy = await account.findByPk(item.updated_by, {
          attributes: ['nama'], // Ambil atribut 'nama' dari account yang memperbarui role
        });

        const roles = [];

        item.role_has_permissions.forEach((element) => {
          roles.push(element.role.name);
        });

        return {
          id: item.id,
          name: item.name,
          guard_name: item.guard_name,
          created_at: item.created_at,
          updated_at: item.updated_at,
          created_by: createdBy ? createdBy.nama : null,
          updated_by: updatedBy ? updatedBy.nama : null,
          roles,
        };
      }),
    );

    return this.formatResponse(
      formattedData,
      queryOptions,
      page,
      pageSize,
      offset,
      '/api/permissions/filter',
    );
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
