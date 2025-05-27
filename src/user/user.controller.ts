import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserDto, UpdatePasswordDto } from "./dto/user.dto";
import { instanceToPlain } from "class-transformer";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  findAll(): User[] {
    return this.userService.findAll()
  }
  @Get(':id')
  @HttpCode(200)
  findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): User {
    const user = this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = this.userService.create(createUserDto)
    return instanceToPlain(newUser)
  }
  @Put(':id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updatePassword(@Param('id', new ParseUUIDPipe()) id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.userService.updatePassword(id, updatePasswordDto)
  }
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.delete(id)
  }
}