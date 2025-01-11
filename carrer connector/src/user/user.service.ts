import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { NumericType, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    ){}

  async CreateUser(createUserDto: CreateUserDto): Promise<User> {
  const user = this.usersRepository.create(createUserDto);
  const savedUser = await this.usersRepository.save(user);
  return savedUser[0];
}


async getAllUsers():Promise<User[]>{
    return this.usersRepository.find()
}

async getUserById(id:number):Promise <User>{
const user=  await this.usersRepository.findOne({
    where:{id }
})
if (!user){
    throw new Error ('User can not be found')
}
return user
}
async updateUser(id: number, updateUserDto: CreateUserDto): Promise<User> {
  let user = await this.getUserById(id);
   Object.assign(user, updateUserDto);
  return this.usersRepository.save(user);
}


async deleteUser(id:number):Promise<void> {
    const user =await this.getUserById(id);
    await this.usersRepository.remove(user);
}
}



 