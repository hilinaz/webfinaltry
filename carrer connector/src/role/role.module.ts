import { Module, OnModuleInit } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Role])],
  providers: [RoleService],
  exports:[RoleService],
  controllers: [RoleController]
})
export class RoleModule implements OnModuleInit{
  constructor(private readonly roleService:RoleService){}
    async onModuleInit(){
      await this.roleService.seedRoles();}
    
  }

