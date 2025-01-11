import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; 
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    UserModule,
    JwtModule.register({
      secret:'carrer1234connect',
      signOptions:{expiresIn:'1h'}

    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
