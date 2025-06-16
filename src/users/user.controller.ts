import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(200)
  findAll() {
    return this.userService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  @HttpCode(200)
  findById(@Param('id') id: string) {
     return this.userService.findById(id);
  }
  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updatePassword(
    @Param('id') id: string, @Body() UpdatePasswordDto: UpdatePasswordDto
  ) {
    return this.userService.updatePassword(id, UpdatePasswordDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
