import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { NumericType, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private roleService:RoleService,
    ){}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;
    const roleEntity = await this.roleService.getRoleById(role.id);
    const user = this.usersRepository.create({
      email,
      password,
      role: roleEntity,
    });
    return this.usersRepository.save(user);
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



 