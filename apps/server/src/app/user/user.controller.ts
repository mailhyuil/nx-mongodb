/*
https://docs.nestjs.com/controllers#controllers
*/

import { CreateUserDTO, UpdateUserDTO } from '@mongo/libs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userService.findById(id);
  }

  @Post()
  async create(@Body() user: CreateUserDTO) {
    return await this.userService.create(user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
