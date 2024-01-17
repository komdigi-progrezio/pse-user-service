import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { request } from 'http';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('authUser')
  auth(@Payload() authUserDto: any) {
    return this.usersService.auth(authUserDto);
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
  storeParent(@Payload() data: any) {
    const account_id = data.account_id;
    return this.usersService.storeParent(data, account_id);
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
}
