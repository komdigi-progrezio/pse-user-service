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

@Injectable()
export class RolesService {
  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
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
    const page = request.page;
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

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
