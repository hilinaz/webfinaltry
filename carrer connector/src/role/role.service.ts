import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,){}

    async getRole(): Promise <Role[]>{
        return this.roleRepository.find()
    }

    async getRoleById(id:number) : Promise <Role>{
        const role= await this.roleRepository.findOneBy({id});
         if (!role) {
      throw new Error('Role not found');
    }
    return role;
  
    }

    async updateRole(id: number, updateRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.getRoleById(id);
    Object.assign(role, updateRoleDto);
    return this.roleRepository.save(role);
  }




    async deleteRole(id:number) :Promise<void>{
        const role=await this.getRoleById(id);
        await this.roleRepository.delete(role.id)
    }
    
}
