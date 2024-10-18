import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

@Controller('users')
export class UsersController {
  @Get()
  async list() {
    return {
      users: [],
    };
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return {
      user: {},
      id,
    };
  }

  @Put(':id')
  async update(
    @Body() body: UpdatePutUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      user: {},
      id,
      body,
      method: 'put',
    };
  }

  @Patch(':id')
  async updatePartial(
    @Body() body: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      user: {},
      id,
      body,
      method: 'patch',
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      message: `User ${id} foi deletado com sucesso!`,
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
