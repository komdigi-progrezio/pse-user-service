import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { account, account_roles, roles } from 'models';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return 'This action adds a new user';
  }
  async findAllFilter(request: any) {
    const pageSize = 10; // Jumlah item per halaman
    const page = request.page || 1; // Mendapatkan nomor halaman dari permintaan atau default ke halaman 1

    const offset = (page - 1) * pageSize;

    const queryOptions: any = {};
    // return request.roles;

    if (request.roles && request.roles === 'admin') {
      queryOptions.is_admin = 1;
    }

    if (request.status && request.status !== 'all') {
      queryOptions.status = request.status;
    }

    if (request.filter && request.q) {
      queryOptions[request.filter] = {
        [Op.iLike]: `%${request.q}%`,
      };
    }
    const fromDate = request.created_at;
    const toDate = request.modified_at;

    if (
      request.tanggal &&
      request.created_at &&
      request.modified_at &&
      request.tanggal !== 'all'
    ) {
      queryOptions[request.tanggal] = {
        [Op.between]: [fromDate, toDate],
      };
    } else if (
      request.tanggal &&
      request.created_at &&
      request.tanggal !== 'all'
    ) {
      queryOptions[request.tanggal] = {
        [Op.gte]: fromDate,
      };
    } else if (
      request.tanggal &&
      request.modified_at &&
      request.tanggal !== 'all'
    ) {
      queryOptions[request.tanggal] = {
        [Op.lte]: toDate,
      };
    }

    const data = await account.findAll({
      include: [
        {
          model: account_roles,
          include: [
            {
              model: roles,
            },
          ],
        },
      ],
      limit: pageSize,
      offset: offset,
      where: queryOptions,
    });

    const totalCount = await account.count({ where: queryOptions });
    const totalPages = Math.ceil(totalCount / pageSize);

    const formattedData = data.map((item) => ({
      id: item.id,
      nama: item.nama,
      nip: item.nip,
      jabatan: item.jabatan,
      instansi: item.instansi_induk_text,
      tanggal_daftar: item.created_at,
      tanggal_update: item.modified_at,
      status: item.status,
      role: [item.account_role.role.name],
    }));

    const to = offset + data.length; // Hitung nilai 'to'

    return {
      data: formattedData,
      links: {
        first: `${process.env.APP_DOMAIN}/api/users/filter/official?page=1`,
        last: `${process.env.APP_DOMAIN}/api/users/filter/official?page=${totalPages}`,
        prev:
          page > 1
            ? `${process.env.APP_DOMAIN}/api/users/filter/official?page=${
                page - 1
              }`
            : null,
        next:
          page < totalPages
            ? `${process.env.APP_DOMAIN}/api/users/filter/official?page=${
                page + 1
              }`
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
    const data = await account.findByPk(id, {
      include: {
        model: account_roles,
        include: [
          {
            model: roles,
          },
        ],
      },
    });

    return {
      data,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
