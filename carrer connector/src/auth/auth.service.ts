import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UpsertOptions } from 'typeorm/repository/UpsertOptions';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>,
        private  readonly jwtService: JwtService
    ){}


async register(createUserDto:CreateUserDto):Promise<User>{
    const hashedPassword=await bcrypt.hash(createUserDto.password,10);
    const user =this.userRepository.create({
        ...createUserDto,password:hashedPassword});
        return this.userRepository.save(user)
}

async validateUser(email:string,password:string):Promise<User| null>{
    const user= await this.userRepository.findOne({where:{email}});
    if (user&& (await bcrypt.compare(password,user.password))){
        return user;

    }
    return null;
}
async login (email:string, password:string):Promise<{accessToken:string}>{
    const user=await this.validateUser(email,password);
    if(!user){
        throw new Error('Invalid credintials');
    }
    const payload= {id:user.id, email:user.email,role:user.role}
    const accessToken=this.jwtService.sign(payload);
    return {accessToken}
}
}
