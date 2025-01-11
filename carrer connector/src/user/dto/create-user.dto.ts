import { Role } from "src/role/role.entity";

export class CreateUserDto{
   username:string;
   email:string;
   password: string;
   fullname:string;
   role: Role;
}