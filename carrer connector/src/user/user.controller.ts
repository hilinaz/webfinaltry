import { Body, Controller ,Post,Get ,Delete, Param, Patch} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { promises } from 'dns';


@Controller('user')
export class UserController {
   constructor(private readonly userService: UserService) {}

   @Post()
   createUser(@Body() createUserDto:CreateUserDto) : Promise<User>{
    return this.userService.CreateUser(createUserDto)
   }

   @Get()
   getAllUsers():Promise<User[]>{
    return this.userService.getAllUsers()
   }

@Get(":id")
getUserById(@Param('id') id: number): Promise<User> {
  return this.userService.getUserById(id); }

   @Patch(':id')
   updateUser(@Param('id') id:number , @Body() updateUserDto:CreateUserDto): Promise<User>{
    return this,this.userService.updateUser(id,updateUserDto)
   }

   @Delete(':id')
   deleteUser(@Param('id') id:number):Promise<void>{
    return this.userService.deleteUser(id)
   }


}
