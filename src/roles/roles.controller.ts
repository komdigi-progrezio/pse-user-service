import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern('createRole')
  create(@Payload() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @MessagePattern('findAllRoles')
  findAll(request) {
    return this.rolesService.findAll(request);
  }

  @MessagePattern('findOneRole')
  findOne(@Payload() data: any) {
    return this.rolesService.findOne(data.id);
  }

  @MessagePattern('updateRole')
  update(@Payload() updateRoleDto: any) {
    return this.rolesService.update(updateRoleDto.id, updateRoleDto);
  }

  @MessagePattern('removeRole')
  remove(@Payload() id: number) {
    return this.rolesService.remove(id);
  }
}
