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

    async getRoles(): Promise <Role[]>{
        return this.roleRepository.find()
    }
    async getRoleByName(roleName:string):Promise<Role>{
        const role= await this.roleRepository.findOne({where:{name: roleName}})
        if(!role){
            throw new Error(`Role ${roleName} not found`)
        }
        return role;
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

    async seedRoles(): Promise<void> {
        const staticRoles=['Admin','Customer','Service Giver']
        for (const roleName of staticRoles) {
            const roleExists= await this.roleRepository.findOne({where:{name:roleName}})
            if(!roleExists){
                const newRole=this.roleRepository.create({name:roleName})
                await this.roleRepository.save(newRole)
            }
        }
    }
    
}
