import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { users } from "./user.storage";
import { CreateUserDto } from "./dto/create-user.dto";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  private users = users
  findAll(): User[] {
    return this.users
  }
  findById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }
  create(createUserDto: CreateUserDto): User {
    const newUser = new User({
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    this.users.push(newUser);
    return newUser
  }
}
