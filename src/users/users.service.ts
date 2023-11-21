import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  account,
  account_roles,
  account_satuan_kerja,
  par_satuan_kerja,
  permissions,
  role_has_permissions,
  roles,
  user_fcm_tokens,
  users,
} from 'models';
import { Op } from 'sequelize';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  async auth(authUserDto: any) {
    // 'kode_pos' => $this->parInstansi === null ? 'Kosong' : $this->parInstansi->kode_pos,
    // 'instansi_induk' => $this->instansi_induk,
    // 'dokumen' => $this->dokumen,
    // 'url_dokumen' => url('/') . '/storage/dokumen_pejabat/' . $this->id . '/' . $this->dokumen,
    // 'last_login' => $this->last_login,

    const dataUser = await account.findOne({
      where: { username: authUserDto },
      include: {
        model: account_roles,
        include: [
          {
            model: roles,
            include: [
              {
                model: role_has_permissions,
                include: [
                  {
                    model: permissions,
                  },
                ],
              },
            ],
          },
        ],
      },
    });

    // return dataUser;

    const permissionsData = [];

    for (
      let i = 0;
      i < dataUser.account_role.role.role_has_permissions.length;
      i++
    ) {
      const element = dataUser.account_role.role.role_has_permissions[i];
      permissionsData.push(element.permission.name);
    }

    // return permissionsData;

    return {
      data: {
        id: dataUser.id,
        nama: dataUser.nama,
        email: dataUser.email,
        status: dataUser.status,
        nama_status: dataUser.status === 1 ? 'Aktif' : 'Tidak Aktif',
        username: dataUser.username,
        nip: dataUser.nip,
        jabatan: dataUser.jabatan,
        no_telepon: dataUser.no_telepon,
        satuan_kerja: dataUser.satuan_kerja,
        alamat: dataUser.alamat ? dataUser.alamat : 'Kosong',
        kota: dataUser.kota,
        propinsi: dataUser.propinsi,
        roles: [dataUser.account_role.role.name],
        permissions: permissionsData,
      },
    };
  }
  private errorResponse(error) {
    return {
      status: 500,
      message: 'Error : ' + error,
    };
  }

  async setupAdmin() {
    try {
      await account.update(
        {
          username: 'adminpse@kominfo.go.id',
        },
        {
          where: {
            username: 'admin',
          },
        },
      );
      return {
        status: 200,
        message: 'Data Berhasil di Perbaharui',
      };
    } catch (error) {
      this.errorResponse(error);
    }
  }

  async notifToken(request: any) {
    try {
      await user_fcm_tokens.update(
        {
          apns_id: request.token,
        },
        {
          where: {
            user_id: 4,
          },
        },
      );
      return {
        status: 200,
        message: 'Data Berhasil di Perbaharui',
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Error : ' + error,
      };
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      let data = new CreateUserDto();
      data.isAdmin = createUserDto.isAdmin;
      data.nama = createUserDto.nama;
      data.status = +createUserDto.status;
      data.username = createUserDto.username;

      // return data;

      const errors = await validate(data);
      // return errors;
      if (errors.length > 0) {
        // Jika ada kesalahan validasi, kembalikan pesan kesalahan yang deskriptif

        return {
          status: 422,
          message: 'The given data was invalid.',
          errors: errors
            .map((error) => Object.values(error.constraints))
            .flat(),
        };
      }
      // return 0;
      // return createUserDto;
      const create = await account.create(data);
      if (create.id) {
        return {
          status: 200,
          message: 'Data Berhasil di Tambahkan',
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: `Error: ${error}`,
      };
    }
  }

  async storeParent(request: any) {
    try {
      // const satuanKerjaText = await par_satuan_kerja.findOne({
      //   where:{
      //     id:
      //   }
      // })

      // const data = await account.create(request);

      // const satuanKerja = request.satuan_kerja;

      // // Menggunakan Promise.all untuk menunggu semua operasi selesai
      // await Promise.all(
      //   satuanKerja.map(async (element: any) => {
      //     const satuan_kerja = await account_satuan_kerja.findAll({
      //       where: {
      //         satuan_kerja_id: element,
      //       },
      //     });
      //     if (satuan_kerja.length === 0) {
      //       await account_satuan_kerja.create({
      //         account_id: data.id,
      //         satuan_kerja_id: element,
      //       });
      //     }
      //   }),
      // );

      // const subPejabatId = await roles.findOne({
      //   where: {
      //     name: 'Sub Pejabat',
      //   },
      // });

      // // Menambahkan role 'Sub Pejabat' untuk akun yang baru dibuat
      // await account_roles.create({
      //   account_id: data.id,
      //   role_id: subPejabatId.id,
      // });

      // Mengembalikan data akun yang baru dibuat
      return {
        status: 400,
        message: 'UNDER MAINTENANCE',
      };
    } catch (error) {
      // Menangkap dan mengembalikan pesan kesalahan jika terjadi kesalahan
      return {
        status: 500,
        message: 'Gagal menyimpan data: ' + error.message,
      };
    }
  }

  async findAll(request: any) {
    const pageSize = 10; // Jumlah item per halaman
    const page = request.page || 1; // Mendapatkan nomor halaman dari permintaan atau default ke halaman 1

    const offset = (page - 1) * pageSize;
    const queryOptions: any = {};

    if (request.status && request.status !== 'all') {
      queryOptions.status = request.status;
    }

    if (
      request.filter &&
      request.filter !== 'all' &&
      request.q &&
      request.q !== null
    ) {
      if (request.filter === 'instansi') {
        queryOptions.instansi_induk_text = {
          [Op.iLike]: `%${request.q}%`,
        };
      } else {
        queryOptions[request.filter] = {
          [Op.iLike]: `%${request.q}%`,
        };
      }
    }

    const data = await account.findAll({
      include: [
        {
          model: account_roles,
          include: [
            {
              model: roles,
              where: {
                name: {
                  [Op.in]: ['Sub Pejabat', 'Pejabat'],
                },
              },
            },
          ],
        },
      ],
      where: queryOptions,
      order: [['last_login', 'DESC']],
      limit: pageSize,
      offset: offset,
    });

    return this.formatResponse(
      data,
      queryOptions,
      page,
      pageSize,
      offset,
      '/api/users/filter/officiallog',
    );
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

  private async formatResponse(
    data: any,
    queryOptions: any,
    page: number,
    pageSize: number,
    offset: number,
    basePath: string = '',
  ) {
    const totalCount = await this.getAccountCount(queryOptions);
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

  private formatISOStringToDMYHI(dateString) {
    const date = new Date(dateString); // Membuat objek Date dari string ISO
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Menambahkan 0 di depan angka bulan, tanggal, jam, dan menit jika kurang dari 10
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Mengembalikan string dalam format "d m Y H:i"
    return `${formattedDay} ${formattedMonth} ${year} ${formattedHours}:${formattedMinutes}`;
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

    const formattedData = data.map((item) => {
      return {
        id: item.id,
        username: item.username,
        nama: item.nama,
        status: item.status,
        nama_status: item.status === 1 ? 'Aktif' : 'Tidak Aktif',
      };
    });

    return this.formatResponse(
      formattedData,
      queryOptions,
      page,
      pageSize,
      offset,
      '/api/users/parent/account',
    );
  }

  async findAllFilter(request: any) {
    const pageSize = 10; // Jumlah item per halaman
    const page = request.page || 1; // Mendapatkan nomor halaman dari permintaan atau default ke halaman 1
    const offset = (page - 1) * pageSize;
    const queryOptions: any = {};

    if (request.email) {
      queryOptions.username = request.email;
    }

    if (request.roles && request.roles === 'admin') {
      queryOptions.is_admin = 1;
    } 
    else {
      queryOptions.is_admin = null;
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

    // return data;

    const formattedData = data.map((item) => {
      return {
        id: item.id,
        nama: item.nama,
        nip: item.nip,
        jabatan: item.jabatan,
        instansi_induk_text: item.instansi_induk_text,
        tanggal_daftar: item.created_at,
        tanggal_update: item.modified_at,
        status: item.status,
        nama_status: item.status == 1 ? 'Aktif' : 'Tidak Aktif',
        last_login: this.formatISOStringToDMYHI(item.last_login),
        roles: [item.account_role.role.name],
        created_at: this.formatISOStringToDMYHI(item.created_at),
        modified_at: this.formatISOStringToDMYHI(item.modified_at),
      };
    });

    return this.formatResponse(
      formattedData,
      queryOptions,
      page,
      pageSize,
      offset,
      '/api/users/filter/official',
    );
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

    return this.formatResponse(
      formattedData,
      queryOptions,
      page,
      pageSize,
      offset,
      '/api/users/change',
    );
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

  async newManager(id: number) {
    const findUser = await account.findByPk(id);

    const queryOptions: any = {};
    queryOptions.instansi_induk = findUser.instansi_induk;
    queryOptions.status_register = 1;

    const data = await account.findAll({
      where: queryOptions,
    });

    return {
      data: data[0],
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      let data = new UpdateUserDto();
      data.id = updateUserDto.id;
      data.isAdmin = updateUserDto.isAdmin;
      data.nama = updateUserDto.nama;
      data.status = +updateUserDto.status;
      data.username = updateUserDto.username;

      // return data;

      const errors = await validate(data);
      // return errors;
      if (errors.length > 0) {
        // Jika ada kesalahan validasi, kembalikan pesan kesalahan yang deskriptif

        return {
          status: 422,
          message: 'The given data was invalid.',
          errors: errors
            .map((error) => Object.values(error.constraints))
            .flat(),
        };
      }
      // return 0;
      // return updateUserDto;
      const create = await account.update(data, {
        where: {
          id,
        },
      });
      // return create;

      if (create) {
        return {
          status: 200,
          message: 'Data Berhasil di Perbaharui',
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: `Error: ${error}`,
      };
    }
  }

  async remove(id: number) {
    try {
      const response = await account.destroy({
        where: { id },
      });

      if (response) {
        return {
          status: 200,
          message: 'Data Berhasil di Hapus',
        };
      } else {
        throw new Error('Data dengan ID tersebut tidak ditemukan.');
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Gagal menghapus data: ' + error.message,
      };
    }
  }

  async updateProfile(id: number, request: any) {
    const create = await account.update(request, {
      where: {
        id,
      },
    });
    // return create;

    if (create) {
      return {
        status: 200,
        message: 'Data Berhasil di Perbaharui',
      };
    }
    return {
      status: 400,
      message: 'UNDER MAINTENANCE',
    };
  }

  private async getAccountCount(queryOptions: any) {
    return await account.count({ where: queryOptions });
  }

  async approvedAccountChange(request: any) {
    const newId = request.new_id;
    const oldId = request.old_id;

    return request;
  }
}
