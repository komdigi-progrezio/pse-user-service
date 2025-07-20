import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { request } from 'http';
import * as fs from 'fs/promises'; // Modul fs dari Node.js versi 14 ke atas
import { errorResponse } from 'src/utils/errorResponse';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('authUser')
  auth(@Payload() authUserDto: any) {
    return this.usersService.auth(authUserDto);
  }
  @MessagePattern('outUser')
  logout(@Payload() outUserDto: any) {
    return this.usersService.logout(outUserDto);
  }
  @MessagePattern('getProfilUser')
  getProfil(@Payload() account_id: any) {
    return this.usersService.getProfil(account_id);
  }

  @MessagePattern('setupAdmin')
  setupAdmin() {
    return this.usersService.setupAdmin();
  }
  @MessagePattern('notifToken')
  notifToken(@Payload() request: any) {
    return this.usersService.notifToken(request);
  }
  @MessagePattern('createUser')
  create(@Payload() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }
  @MessagePattern('storeParent')
  storeParent(@Payload() storeParentDto: any) {
    try {
      const data: any = storeParentDto.body;

      const account_id = data.account_id;

      delete storeParentDto.body;

      const buffer = Buffer.from(storeParentDto.buffer.data);

      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';

      for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      const nama_document = `dokumen_pejabat_${result}.pdf`;

      // Tulis buffer ke dalam file
      fs.writeFile(`assets/document/${nama_document}`, buffer);

      data.dokumen = nama_document;

      return this.usersService.storeParent(data, account_id);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @MessagePattern('findAllUsersLog')
  findAll(@Payload() request: any) {
    return this.usersService.findAll(request, request.account_id);
  }

  @MessagePattern('findAllUsersFilter')
  filter(@Payload() request: any) {
    return this.usersService.findAllFilter(request);
  }
  @MessagePattern('findChangeUsersFilter')
  change(@Payload() data: any) {
    const account_id = data.account_id;

    return this.usersService.change(data, account_id);
  }
  @MessagePattern('newManager')
  newManager(@Payload() id: any) {
    return this.usersService.newManager(id);
  }
  @MessagePattern('parentUserFilter')
  parent(@Payload() data: any) {
    if (!data.parent_id) {
      return {
        data: [],

        links: {
          first: `${process.env.APP_DOMAIN}/api/users/parent/account?page=1`,
          last: `${process.env.APP_DOMAIN}/api/users/parent/account?page=1`,
          prev: null,
          next: null,
        },

        meta: {
          current_page: 1,
          from: null,
          last_page: 1,
          links: [
            {
              url: null,
              label: '&laquo; Previous',
              active: false,
            },
            {
              url: `${process.env.APP_DOMAIN}/api/users/parent/account?page=1`,
              label: '1',
              active: true,
            },
            {
              url: null,
              label: 'Next &raquo;',
              active: false,
            },
          ],
          path: `${process.env.APP_DOMAIN}/api/users/parent/account`,
          per_page: 10,
          to: null,
          total: 0,
        },
      };
    }
    return this.usersService.parent(data);
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }
  @MessagePattern('changeStatusUser')
  changeStatusUser(@Payload() request: any) {
    return this.usersService.changeStatusUser(request);
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUserDto: any) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }
  @MessagePattern('approvedAccountChange')
  approvedAccountChange(@Payload() request: any) {
    return this.usersService.approvedAccountChange(request);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }

  @MessagePattern('updateProfile')
  updateProfile(@Payload() updateProfile: any) {
    return this.usersService.updateProfile(updateProfile.id, updateProfile);
  }

  @MessagePattern('dropdownUser')
  dropdown(@Payload() request: any) {
    return this.usersService.dropdown(request);
  }

  @MessagePattern('getUserByUsername')
  getUserByUsername(@Payload() request: any) {
    return this.usersService.getUserByUsername(request);
  }

  @MessagePattern('storePejabatPublic')
  storePejabatPublic(@Payload() data: any) {
    const file = data.file;

    console.log(file);

    const buffer = file?.buffer?.data ? Buffer.from(file.buffer.data) : Buffer.from('default');

    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 9; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    const nama_document = `dokumen_pejabat_${result}.pdf`;

    // Tulis buffer ke dalam file
    fs.writeFile(`assets/document/${nama_document}`, buffer);

    data.dokumen = nama_document;

    return this.usersService.storePejabatPublic(data);
  }

  @MessagePattern('getDocumentPejabat')
  getDocumentPejabat(@Payload() data: string) {
    return this.usersService.getDocumentPejabat(data);
  }

  @MessagePattern('createLogin')
  createLogin(@Payload() request: any) {
    return this.usersService.createLogin(request);
  }

  @MessagePattern('verifyOtp')
  verifyOtp(@Payload() request: any) {
    return this.usersService.verifyOtp(request);
  }

  @MessagePattern('login-local')
  async loginLocal(@Payload() payload: { username: string; password: string }) {
    return this.usersService.loginLocal(payload.username, payload.password);
  }

  @MessagePattern('create-password')
  async createPassword(@Payload() payload: { token: string; password: string }) {
    return this.usersService.createPassword(payload.token, payload.password);
  }

}
