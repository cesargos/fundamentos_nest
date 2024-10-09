import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  async list() {
    return {
      users: [],
    };
  }

  @Get(':id')
  async getOne(@Param() params) {
    return {
      user: {},
      params,
    };
  }

  @Put(':id')
  async update(@Body() body, @Param() params) {
    return {
      user: {},
      params,
      body,
      method: 'put',
    };
  }

  @Patch(':id')
  async updatePartial(@Body() body, @Param() params) {
    return {
      user: {},
      params,
      body,
      method: 'patch',
    };
  }

  @Delete(':id')
  async delete(@Param() params) {
    return {
      message: `User ${params?.id} foi deletado com sucesso!`,
    };
  }

  @Post()
  async create(@Body() body: CreateUserDTO) {
    return {
      user: {},
      body,
      method: 'post',
    };
  }
}
