import { Controller, Get, Post,Param ,Put,Body} from '@nestjs/common';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('role')
export class RoleController {
constructor(private readonly roleService:RoleService) {}
@Get()
getRole():Promise<Role[]>{
    return this.roleService.getRole();
}
@Get(':id')
 getRoleById(@Param('id') id: number): Promise<Role> {
    return this.roleService.getRoleById(id);
  }
@Put(':id')
  updateRole(@Param('id') id: number, @Body() updateRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.updateRole(id, updateRoleDto);
  }
}
