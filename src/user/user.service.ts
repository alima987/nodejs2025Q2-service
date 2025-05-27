import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { users } from "./user.storage";

@Injectable()
export class UserService {
  private users = users
  findAll(): User[] {
    return this.users
  }
}