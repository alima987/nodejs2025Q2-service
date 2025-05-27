import { Controller, Get, HttpCode } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  @HttpCode(200)
  findAll(): User[] {
    return this.userService.findAll()
  }
}