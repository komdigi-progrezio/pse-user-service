import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  account,
  account_roles,
  account_satuan_kerja,
  login_activity,
  par_instansi,
  par_kota,
  par_propinsi,
  par_satuan_kerja,
  permissions,
  role_has_permissions,
  roles,
  sis_profil,
  user_fcm_tokens,
  users,
} from 'models';
import { Op } from 'sequelize';
import { validate } from 'class-validator';
import { formattedDate } from 'src/utils/formattedDate';
import { createSuccessResponse } from 'src/utils/createSuccessResponse';

import * as fs from 'fs';
const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false // This option ignores SSL certificates
});

@Injectable()
export class UsersService {
  async auth(authUserDto: any) {
    // 'kode_pos' => $this->parInstansi === null ? 'Kosong' : $this->parInstansi->kode_pos,
    // 'instansi_induk' => $this->instansi_induk,
    // 'dokumen' => $this->dokumen,
    // 'url_dokumen' => url('/') . '/storage/dokumen_pejabat/' . $this->id . '/' . $this->dokumen,
    // 'last_login' => $this->last_login,
    const dateIn = new Date();
    const updateLogin = await account.update(
      {
        last_login: formattedDate(dateIn),
      },
      { where: { username: authUserDto } },
    );

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
        status_register: dataUser.status_register === 1 ? 'Pejabat' : 'Sub Pejabat',
        nama_instansi: dataUser.instansi_induk_text,
        nip: dataUser.nip,
        jabatan: dataUser.jabatan,
        instansi_induk: dataUser.instansi_induk,
        instansi_induk_text: dataUser.instansi_induk_text,
        no_telepon: dataUser.no_telepon,
        no_hp: dataUser.no_hp,
        satuan_kerja: dataUser.satuan_kerja,
        alamat: dataUser.alamat ? dataUser.alamat : 'Kosong',
        kota: dataUser.kota,
        propinsi: dataUser.propinsi,
        roles: [dataUser.account_role.role.name],
        permissions: permissionsData,
        kode_pos: dataUser.kode_pos,
        created_at: dataUser.created_at,
      },
    };
  }

  async logout(outUserDto: any) {
    const dateOut = new Date();
    const updateLogout = await account.update(
      {
        last_logout: formattedDate(dateOut),
      },
      { where: { username: outUserDto } },
    );

    if(updateLogout){
      return {
        status: 200,
        message: 'Sukses Logout',
      };  
    }
  }

  async getProfil(account_id: any) {
    const dataUser = await account.findOne({
      where: { id: account_id },
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

    let url_dokumen_pejabat = `${process.env.APP_DOMAIN}/api/storage/dokumen_pejabat/${dataUser.id}/${dataUser.dokumen}`;
    // const image_exist = async(image_url) =>{
    //   let result = true;
    //   const response = await axios.get(
    //     image_url
    //   ).catch(function (error) {
    //     result = false;
    //   });

    //   return result;
    // }
    // const check_image = await image_exist(url_dokumen_pejabat);
    // if(!check_image){
    //   url_dokumen_pejabat = process.env.OLD_APP_DOMAIN + `/storage/dokumen_pejabat/` + dataUser.id + "/" + dataUser.dokumen;
    // }

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
        instansi_induk: dataUser.instansi_induk,
        instansi_induk_text: dataUser.instansi_induk_text,
        no_telepon: dataUser.no_telepon,
        no_hp: dataUser.no_hp,
        satuan_kerja: dataUser.satuan_kerja,
        alamat: dataUser.alamat ? dataUser.alamat : 'Kosong',
        kota: dataUser.kota,
        dokumen: dataUser.dokumen,
        url_dokumen:url_dokumen_pejabat,
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

  async create(createUserDto: any) {
    try {
      const isNotify = createUserDto.is_notify == 'Ya' ? true : false;
      if (isNotify) {
        const notifiedAccounts = await account.findAll({
          where: {
            is_notify: true,
            is_admin: 1,
          },
        });
        if (notifiedAccounts.length >= 5) {
          throw new Error(
            'Tidak bisa merubah account karena account di notifikasi sudah melebihi 5 account',
          );
        }
      }

      const data = {
        nama: createUserDto.name,
        username: createUserDto.username,
        status: createUserDto.status,
        is_notify: isNotify,
        is_admin: 1,
      };
      const create = await account.create(data);
      if (create.id) {
        const roleId = 2;

        const createRoles = await account_roles.create({
          role_id: roleId.toString(),
          account_id: create.id.toString(),
        });

        if (createRoles.id) {
          return {
            status: 200,
            message: 'Data Berhasil di Tambahkan id: ' + create.id,
          };
        }
      }
    } catch (error) {
      return {
        status: 500,
        message: `Error: ${error}`,
      };
    }
  }

  async storeParent(request: any, account_id: number) {
    try {
      // const satuanKerjaText = await par_satuan_kerja.findOne({
      //   where:{
      //     id:
      //   }
      // })

      delete request._method;
      delete request.id;

      const satuanKerjaNama = await par_satuan_kerja.findByPk(
        request.satuan_kerja[0],
      );
      const instansiInduk = await par_instansi.findByPk(
        +request.instansi_induk,
      );

      const data = await account.create({
        username: request.username,
        nama: request.nama,
        nip: request.nip,
        jabatan: request.jabatan,
        no_telepon: request.no_telepon,
        no_hp: request.no_hp,
        instansi_induk: +request.instansi_induk,
        instansi_induk_text: instansiInduk ? instansiInduk.name : null,
        satuan_kerja: satuanKerjaNama.name,
        parent_id: account_id,
        dokumen: request.dokumen,
      });

      const satuanKerja = request.satuan_kerja;

      // Menggunakan Promise.all untuk menunggu semua operasi selesai
      await Promise.all(
        satuanKerja.map(async (element: any) => {
          const satuan_kerja = await account_satuan_kerja.findAll({
            where: {
              satuan_kerja_id: +element,
            },
          });
          if (satuan_kerja.length === 0) {
            console.log('first', typeof +data.id);
            await account_satuan_kerja.create({
              account_id: data.id,
              satuan_kerja_id: +element,
            });
          }
        }),
      );

      const subPejabatId = await roles.findOne({
        where: {
          name: 'Sub Pejabat',
        },
      });

      // Menambahkan role 'Sub Pejabat' untuk akun yang baru dibuat
      await account_roles.create({
        account_id: data.id.toString(),
        role_id: subPejabatId.id,
      });

      // Mengembalikan data akun yang baru dibuat
      return createSuccessResponse(data.id);
    } catch (error) {
      // Menangkap dan mengembalikan pesan kesalahan jika terjadi kesalahan
      return {
        status: 500,
        message: 'Gagal menyimpan data: ' + error.message,
      };
    }
  }

  async findAll(request: any, account_id: number) {
    // console.log(account_id);
    const pageSize = 10; // Jumlah item per halaman
    const page: number = +request.page || 1; // Mendapatkan nomor halaman dari permintaan atau default ke halaman 1

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

    queryOptions.id = {
      [Op.not]: account_id,
    };

    const rolesQueryOptions: any = {};

    rolesQueryOptions['name'] = {
      [Op.in]: ['Sub Pejabat', 'Pejabat'],
    };

    const data = await account.findAll({
      include: [
        {
          model: account_roles,

          include: [
            {
              model: roles,
              where: rolesQueryOptions,
            },
          ],
        },
      ],
      where: queryOptions,
      order: [['last_login', 'DESC']],
      limit: pageSize,
      offset: offset,
    });

    const formattedData = data.map((item) => ({
      id: item.id,
      nama: item.nama,
      email: item.email,
      status: item.status,
      nama_status: item.status === 1 ? 'Aktif' : 'Tidak Aktif',
      username: item.username,
      last_login: formattedDate(new Date(item.last_login)),
      nip: item.nip,
      jabatan: item.jabatan,
      no_telepon: item.no_telepon,
      satuan_kerja: item.satuan_kerja,
      alamat: item.alamat ? item.alamat : 'Kosong',
      kota: item.kota,
      propinsi: item.propinsi,
      status_register: item.account_role.role
        ? item.account_role.role.name
        : 'Kosong', // harusnya roles
      instansi_induk_text: item.instansi_induk_text,
    }));

    return this.formatResponse(
      formattedData,
      queryOptions,
      page,
      pageSize,
      offset,
      '/api/users/filter/officiallog',
    );
  }

  async changeStatusUser(request: any) {
    try {
      let query = {
        status: request.status === 'enable' ? 1 : 0,
        alasan: request.alasan,
      };
      if (request.status === 'enable') {
        query['keycloak_id'] = request.keycloakId;
        query['is_has_keycloak'] = true;
      }
      if (request.status === 'disable') {
        query['alasan'] = request.alasan;
      }
      const result = await account.update(query, {
        where: {
          id: request.id,
        },
      });

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
    const page: number = +request.page || 1; // Mendapatkan nomor halaman dari permintaan atau default ke halaman 1

    const offset = (page - 1) * pageSize;

    const queryOptions: any = {};

    if (request.parent_id && request.parent_id !== null) {
      queryOptions.parent_id = request.parent_id;
    }

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
    const page: number = +request.page || 1; // Mendapatkan nomor halaman dari permintaan atau default ke halaman 1
    const offset = (page - 1) * pageSize;
    const queryOptions: any = {};
    const orderData = request.orderData || 'DESC';
    let qUpdateDaftar: string;

    if (request.q === 'daftar') {
      qUpdateDaftar = 'created_at';
    } else if (request.q === 'update') {
      qUpdateDaftar = 'modified_at';
    } else {
      qUpdateDaftar = 'modified_at';
    }

    if (request.email) {
      queryOptions.username = request.email;
    }

    if (request.roles && request.roles === 'admin') {
      queryOptions.is_admin = 1;
    } else {
      queryOptions.is_admin = null;
    }

    if (request.status && request.status !== 'all') {
      queryOptions.status = request.status;
    }

    if (request.filter && request.q && request.filter !== 'instansi') {
      queryOptions[request.filter] = {
        [Op.iLike]: `%${request.q}%`,
      };
    } else if (request.filter && request.q && request.filter === 'instansi') {
      queryOptions['instansi_induk_text'] = {
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
      order: [[qUpdateDaftar, orderData]],
    });

    // return data;

    const formattedData = data.map((item) => {
      return {
        id: item.id,
        username: item.username,
        nama: item.nama,
        nip: item.nip,
        jabatan: item.jabatan,
        instansi_induk_text: item.instansi_induk_text,
        tanggal_daftar: item.created_at,
        tanggal_update: item.modified_at,
        status: item.status,
        nama_status: item.status == 1 ? 'Aktif' : 'Tidak Aktif',
        last_login: this.formatISOStringToDMYHI(item.last_login),
        roles: item.account_role ? [item.account_role.role.name] : [''],
        created_at: this.formatISOStringToDMYHI(item.created_at),
        modified_at: this.formatISOStringToDMYHI(item.modified_at),
        is_notify: item.is_notify ? 'Ya' : 'Tidak',
        alasan: item.alasan ? item.alasan : "",
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

  async change(request: any, account_id: number) {
    const pageSize = 10; // Jumlah item per halaman
    const page: number = +request.page || 1; // Mendapatkan nomor halaman dari permintaan atau default ke halaman 1
    const agency = request.agency;
    const offset = (page - 1) * pageSize;
    const orderData = request.orderData || 'DESC';

    const queryOptions: any = {};
    queryOptions.status_register = 2;

    queryOptions.status = {
      [Op.or]: [0, null],
    };

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
      order: [['created_at', orderData]],
    });

    // return data;

    const formattedData = await Promise.all(
      data.map(async (item) => {
        const old_name = await account.findOne({
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
          nama_status:
            item.status === 0 || item.status === null ? 'tidak Aktif' : 'aktif',
          instansi_induk: item.instansi_induk,
          old_name,

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

    let alamatInstansi: par_instansi;

    if (data?.alamat) {
    } else {
      alamatInstansi = await par_instansi.findByPk(data.instansi_induk);
      data.alamat = alamatInstansi ? alamatInstansi.alamat : 'Kosong';
      const kotaInstansi = await par_kota.findByPk(data.kota);
      data.kota = kotaInstansi ? kotaInstansi.nama : 'Kosong';
      const propinsiInstansi = await par_propinsi.findByPk(data.propinsi);
      data.propinsi = propinsiInstansi ? propinsiInstansi.nama : 'Kosong';
      data.kode_pos = alamatInstansi ? alamatInstansi.kode_pos : 'Kosong';
    }

    data.satuan_kerja = data.satuan_kerja ? data.satuan_kerja : 'Kosong';

    let url_dokumen_pejabat = `${process.env.APP_DOMAIN}/api/storage/dokumen_pejabat/${data.id}/${data.dokumen}`;
    // const image_exist = async(image_url) =>{
    //   let result = true;
    //   const response = await axios.get(
    //     image_url
    //   ).catch(function (error) {
    //     result = false;
    //   });

    //   return result;
    // }
    // const check_image = await image_exist(url_dokumen_pejabat);
    // if(!check_image){
    //   url_dokumen_pejabat = process.env.OLD_APP_DOMAIN + '/storage/dokumen_pejabat/' + data.id + "/" + data.dokumen;
    // }

    const formattedData = {
      id: data.id,
      username: data.username,

      nama: data.nama,
      nip: data.nip,
      jabatan: data.jabatan,
      email: data.email,
      no_telepon: data.no_telepon,
      satuan_kerja: data.satuan_kerja,
      alamat: data.alamat,
      kota: data.kota,
      nama_kota: data.kota,
      propinsi: data.propinsi,
      kode_pos: data.kode_pos,
      instansi_induk: data.instansi_induk,
      dokumen: data.dokumen,
      url_dokumen:url_dokumen_pejabat,
      created_at: formattedDate(data.created_at),
      modified_at: formattedDate(data.modified_at),
      status: data.status ? data.status : 0,
      nama_status: data.status === 1 ? 'Aktif' : 'Tidak Aktif',
      nama_provinsi: data.propinsi,

      instansi_induk_text: data.instansi_induk_text,
      nama_instansi: data.instansi_induk_text,
      is_admin: null,
      parent_id: null,
      last_logout: data.last_logout,
      status_register: 2,
      replace_by_account_id: null,
      user_report: null,
      no_hp: data.no_hp,
      is_active: true,
      deleted_at: null,
      gitlab_user_id: null,
      keycloak_id: null,
      is_has_keycloak: null,
      alasan: data.alasan,
    };

    return {
      data: formattedData,
    };
  }

  async newManager(id: number) {
    const findUser = await account.findByPk(id);

    const queryOptions: any = {};
    queryOptions.instansi_induk = findUser.instansi_induk;
    queryOptions.status_register = 1;

    const item = await account.findAll({
      where: queryOptions,
    });

    const data: any = item.length > 0 ? item[0] : {};

    let alamatInstansi: par_instansi;

    if (data.alamat) {
    } else {
      alamatInstansi = await par_instansi.findByPk(data.instansi_induk);
      data.alamat = alamatInstansi ? alamatInstansi.alamat : 'Kosong';
      const kotaInstansi = await par_kota.findByPk(data.kota);
      data.kota = kotaInstansi ? kotaInstansi.nama : 'Kosong';
      const propinsiInstansi = await par_propinsi.findByPk(data.propinsi);
      data.propinsi = propinsiInstansi ? propinsiInstansi.nama : 'Kosong';
      data.kode_pos = alamatInstansi ? alamatInstansi.kode_pos : 'Kosong';
    }

    data.satuan_kerja = data.satuan_kerja ? data.satuan_kerja : 'Kosong';

    const formattedData = {
      id: data.id,
      username: data.username,

      nama: data.nama,
      nip: data.nip,
      jabatan: data.jabatan,
      email: data.email,
      no_telepon: data.no_telepon,
      satuan_kerja: data.satuan_kerja,
      alamat: data.alamat,
      kota: data.kota,
      nama_kota: data.kota,
      propinsi: data.propinsi,
      kode_pos: data.kode_pos,
      instansi_induk: data.instansi_induk,
      dokumen: data.dokumen,
      url_dokumen: data.dokumen,
      created_at: data.created_at,
      modified_at: data.modified_at,
      status: data.status,
      nama_status: data.status === 1 ? 'Aktif' : 'Tidak Aktif',
      nama_provinsi: data.propinsi,

      instansi_induk_text: data.instansi_induk_text,
      nama_instansi: data.instansi_induk_text,
      is_admin: null,
      parent_id: null,
      last_logout: null,
      status_register: 2,
      replace_by_account_id: null,
      user_report: null,
      no_hp: data.no_hp,
      is_active: true,
      deleted_at: null,
      gitlab_user_id: null,
      keycloak_id: null,
      is_has_keycloak: null,
    };

    return {
      data: formattedData,
    };
  }

  async update(id: number, updateUserDto: any) {
    try {
      const isNotify = updateUserDto.is_notify == 'Ya' ? true : false;

      if (isNotify) {
        const notifiedAccounts = await account.findAll({
          where: {
            is_notify: true,
            is_admin: 1,
          },
        });
        if (notifiedAccounts.length >= 5) {
          throw new Error(
            'Tidak bisa merubah account karena account di notifikasi sudah melebihi 5 account',
          );
        }
      }

      const data = {
        nama: updateUserDto.name,
        username: updateUserDto.username,
        status: updateUserDto.status,
        is_notify: isNotify,
        is_admin: 1,
      };

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
    try {
      delete request._method;

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
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  private async getAccountCount(queryOptions: any) {
    return await account.count({ where: queryOptions });
  }

  async approvedAccountChange(request: any) {
    const newId = request.new_id;
    const oldId = request.old_id;

    if (oldId) {
      try {
        const oldUser = await account.findByPk(oldId);
        if (oldUser) {
          await account.update(
            {
              status: 0,
              status_register: 1,
              replace_by_account_id: newId,
              instansi_induk: null,
              instansi_induk_text:null
            },
            { where: { id: oldId } },
          );

          await sis_profil.update(
            {
              account_id: newId,
            },
            { where: { account_id: oldId } },
          );
        }
      } catch (error) {
        return this.errorResponse(error);
      }
    }

    return {
      status: 200,
      message: 'Data Berhasil di Setujui',
    };
  }

  async dropdown(request: any) {
    try {
      const queryOptions: any = {};

      if (request.filter && request.q) {
        queryOptions[request.filter] = {
          [Op.iLike]: `%${decodeURIComponent(request.q)}%`,
        };
      }

      const data = await account.findAll({
        where: queryOptions,
      });

      const formattedData = data.map((item) => ({
        id: item.id,
        username: item.username,
        nama: item.nama,
        status: item.status,
        nama_status: item.status === 1 ? 'Aktif' : 'Tidak Aktif',
      }));

      return {
        data: formattedData,
      };
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  async storePejabatPublic(request: any) {
    try {
      delete request.name;
      delete request.file;

      // TODO: uncomment this before release production
      // const domainRegex = /\.(go\.id|desa\.id|id)$/i;

      // // Melakukan pencocokan ekspresi reguler pada email
      // const hasDesiredExtension = domainRegex.test(request.username);
      // console.log(request.username);
      // console.log('Pass =>   ', hasDesiredExtension);

      // if (!hasDesiredExtension) {
      //   return {
      //     status: 500,
      //     message:
      //       'Email Harus Mengguakan ekstensi domain : go.id, desa.id, atau .id ',
      //   };
      // }

      const dataAgency = await par_instansi.findByPk(request.instansi_induk);

      if (dataAgency) {
        const checkData = await account.findOne({
          where: {
            instansi_induk: request.instansi_induk,
            status_register: request.status_register,
          },
        });
        console.log('dataAgency Pass');
        if (request.status_register == '1') {
          console.log('register 1 pass');
          if (!checkData) {
            const statusApi = 'web';

            const createUser = await account.create(request);
            if (createUser) {
              console.log('find roles');
              const pejabatId = await roles.findOne({
                where: {
                  name: 'Pejabat',
                },
              });
              console.log('end roles');
              console.log('add account roles');
              const addRoles = await account_roles.create({
                role_id: pejabatId.id,
                account_id: createUser.id.toString(),
              });
              console.log('end account roles');
              console.log(createUser.id.toString());
              if (addRoles) {
                return {
                  status: 200,
                  message: 'Data Berhasil di Tambahkan',
                  account_id: createUser.id,
                };
              }
            }
          }
        } else {
          console.log('Register 2 pass');
          console.log(!checkData);

          const checkDataPengganti = await account.findOne({
            where: {
              instansi_induk: request.instansi_induk,
              status: 1,
            },
          });
          console.log('Check data Penganti');

          if (checkDataPengganti) {
            const statusApi = 'web';

            const dataLastUser = await account.findOne({
              where: {
                instansi_induk: request.instansi_induk,
                parent_id: null,
              },
            });
            console.log('Akhir data Penganti');
            console.log('Check data Last User');
            if (dataLastUser) {
              const dataSubUser = await account.findAll({
                where: {
                  parent_id: dataLastUser.id,
                },
              });
              
              console.log('Find data last user');
              // Tambahkan Pesan Error

              // console.log('dataSubUser', dataSubUser);

              // request.parent_id = dataLastUser.id;

              console.log('create user');
              const createUser = await account.create(request);
              console.log('akhir create user');
              if (createUser) {
                console.log('Find role');
                const pejabatId = await roles.findOne({
                  where: {
                    name: 'Pejabat',
                  },
                });
                console.log('End Role');
                const addRoles = await account_roles.create({
                  role_id: pejabatId.id,
                  account_id: createUser.id.toString(),
                });
                console.log('Find data sub');
                if (dataSubUser) {
                  await account.update(
                    {
                      parent_id: createUser.id,
                    },
                    {
                      where: {
                        parent_id: dataLastUser.id,
                      },
                    },
                  );
                  
                }
                console.log('End data sub');
                console.log('start add roles');
                if (addRoles) {
                  return {
                    status: 200,
                    message: 'Data Berhasil di Tambahkan',
                    account_id: createUser.id,
                  };
                }
                console.log('End add roles');
              }
            } else {
              return {
                status: 500,
                message:
                  'Belum Ada Pejabat Baru Terdaftar Di Instansi Yang Di pilih',
              };
            }
          }
        }
      }
      return {
        status: 500,
        message:
          'Satu Instansi Tidak Boleh Lebih Dari Satu Akun / Instansi Tersebut Sudah Memiliki Akun Baru dan Akun Pengganti',
      };
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  async getDocumentPejabat(data: any) {
    try {
      let documentPath = `assets/document/${data.document}`;
      console.log(documentPath);

      let document: any;
      if (!fs.existsSync(documentPath)) {
        documentPath = `assets/dokumen_pejabat/${data.id}/${data.document}`;
        console.log(documentPath);
        if (!fs.existsSync(documentPath)) {
          // ambil badge optional dari api-dev
          console.log(`${process.env.OLD_APP_DOMAIN}/storage/dokumen_pejabat/${data.id}/${data.document}`);
          const response = await axios.get(
            `${process.env.OLD_APP_DOMAIN}/storage/dokumen_pejabat/${data.id}/${data.document}`,
            {
              responseType: 'arraybuffer',
              httpsAgent: agent
            },
          );
          document = response.data || null;
        } else {
          document = fs.readFileSync(documentPath);
        }
      } else {
        document = fs.readFileSync(documentPath);
      }
      return { name: data.document, value: document };
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  async getUserByUsername(request: any){
    const checkUserData = await account.findOne({
      where: {
        username: request.username,
      },
    })

    try {
      if (checkUserData) {
        const randomCode = Math.floor(100000 + Math.random() * 900000);
        console.log(`Kode otp yang dihasilkan: ${randomCode}`);
        return {
          user: checkUserData,
          message: "User ditemukan",
          otpCode: randomCode,
        };
      };
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  async createLogin(request: any) {
    try {
      console.log('createLogin-LOG === ', request)

      if (request.recaptcha) {
        const dataUser = await account.findOne({
          where: {
            username: request.username,
          },
        });
  
        if (dataUser) {
          const randomCode = Math.floor(100000 + Math.random() * 900000);

          console.log(`user ${request.username} telah menerima otp ${randomCode}`)

          const data = await login_activity.create({
            account_id: dataUser.id,
            username: request.username,
            password: request.password,
            otp: randomCode,
          });

          console.log(`data berhasil ditambahkan `, data)
          return {
            // status: 200,
            // message: 'OTP telah berhasil ter generate',
            otpCode: randomCode,
          };
          // const data = {
          //   username: request.username,
          //   password: request.password,
          // };
          // const create = await login_activity.create(data);
          // if (create.id) {
          //   return {
          //     status: 200,
          //     message: 'OTP telah berhasil ter generate',
          //   };
          // }
        } else {
          return {
            status: 500,
            message: 'Data user tidak ditemukan'
          };
        }
      } else {
        return {
          status: 500,
          message: 'Mohon untuk menyutujui reCaptcha'
        };
      }      
    } catch (error) {
      return {
        status: 500,
        message: `Error: ${error}`,
      };
    }
  }

  async verifyOtp(request: any) {
    try {
      console.log('Start to verify otp => ', request);

      if (request.otp) {
        const dataLogUser = await login_activity.findOne({
          where: {
            otp: request.otp,
          },
        });

        if (dataLogUser) {
          
          const createdAtUser = dataLogUser.created_at;
          const now = new Date();
          const differenceInMinutes = (now.getTime() - createdAtUser.getTime()) / (1000 * 60);

          if (differenceInMinutes <= 5) {
            return {
              status: 200,
              message: 'Login berhasil',
            };
          } else {
            return {
              status: 400,
              message: 'OTP sudah kedaluwarsa',
            };
          }
        } else {
          return {
            status: 404,
            message: 'OTP tidak ditemukan',
          };
        }
      } else {
        return {
          status: 400,
          message: 'OTP tidak disertakan dalam permintaan',
        };
      }
    } catch (error) {
      console.error('Error while verifying OTP:', error);
      return {
        status: 500,
        message: 'Terjadi kesalahan pada server',
      };
    }
  }

}
