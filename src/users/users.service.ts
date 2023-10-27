import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { account, account_roles, roles, users } from 'models';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return 'This action adds a new user';
  }
  async changeStatusUser(request: any) {
    try {
      const result = await account.update(
        {
          status: request.status === 'enable' ? 1 : 0,
        },
        {
          where: {
            id: request.id,
          },
        },
      );

      if (result[0] === 1) {
        return {
          status: 200,
          message: 'Data Berhasil di Perbaharui',
        };
      } else {
        throw new Error('User dengan ID tersebut tidak ditemukan.');
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Gagal memperbarui data: ' + error.message,
      };
    }
  }

  async parent(request: any) {
    const pageSize = 10; // Jumlah item per halaman
    const page = request.page || 1; // Mendapatkan nomor halaman dari permintaan atau default ke halaman 1

    const offset = (page - 1) * pageSize;

    const queryOptions: any = {};

    if (request.parent_id && request.parent_id !== null) {
      queryOptions.parent_id = request.parent_id;
    }

    const data = await account.findAll({
      where: queryOptions,
      limit: pageSize,
      offset: offset,
    });

    const totalCount = await account.count({ where: queryOptions });
    const totalPages = Math.ceil(totalCount / pageSize);

    const to = offset + data.length;

    const formattedData = data.map((item) => {
      return {
        id: item.id,
        username: item.username,
        nama: item.nama,
        status: item.status,
        nama_status: item.status === 1 ? 'Aktif' : 'Tidak Aktif',
      };
    });

    return {
      data: formattedData,
      links: {
        first: `${process.env.APP_DOMAIN}api/users/parent/account?page=1`,
        last: `${process.env.APP_DOMAIN}api/users/parent/account?page=${totalPages}`,
        prev:
          page > 1
            ? `${process.env.APP_DOMAIN}api/users/parent/account?page=${
                page - 1
              }`
            : null,
        next:
          page < totalPages
            ? `${process.env.APP_DOMAIN}api/users/parent/account?page=${
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

  async change(request: any) {
    const pageSize = 10; // Jumlah item per halaman
    const page = request.page || 1; // Mendapatkan nomor halaman dari permintaan atau default ke halaman 1
    const agency = request.agency;

    const offset = (page - 1) * pageSize;

    const queryOptions: any = {};

    queryOptions.status_register = 2;
    queryOptions.status = [0, null];

    // return request.roles;

    if (agency) {
      queryOptions.instansi_induk_text = {
        [Op.iLike]: `%${agency}%`,
      };
    }

    if (request.roles && request.roles === 'admin') {
      queryOptions.is_admin = 1;
    }

    if (request.filter && request.q) {
      queryOptions[request.filter] = {
        [Op.iLike]: `%${request.q}%`,
      };
    }

    const data = await account.findAll({
      limit: pageSize,
      offset: offset,
      where: queryOptions,
    });

    // return data;

    const totalCount = await account.count({ where: queryOptions });
    const totalPages = Math.ceil(totalCount / pageSize);

    const formattedData = await Promise.all(
      data.map(async (item) => {
        const oldname = await account.findOne({
          where: {
            instansi_induk: item.instansi_induk,
            status_register: 1,
          },
        });

        return {
          id: item.id,
          nama: item.nama,
          nip: item.nip,
          jabatan: item.jabatan,
          status: item.status,
          nama_status: item.status === 0 ? 'tidak Aktif' : 'aktif',
          instansi_induk: item.instansi_induk,
          oldname,

          nama_instansi: item.instansi_induk_text,
          created_at: item.created_at,
        };
      }),
    );

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
