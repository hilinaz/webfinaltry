import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { RoleModule } from '../role/role.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; 
import { User } from 'src/user/user.entity';
import { Role } from '../role/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from '../role/role.service';
@Module({
  imports:[
    TypeOrmModule.forFeature([User,Role]),
    UserModule,
    RoleModule,
    JwtModule.register({
      secret:'carrer1234connect',
      signOptions:{expiresIn:'1h'}

    })
  ],
  providers: [AuthService ,UserService,RoleService],
  controllers: [AuthController]
})
export class AuthModule {}
