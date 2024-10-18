import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UsersService } from './users.service';
import { ParamId } from 'src/decorators/param-id.decorator';

// @UseInterceptors(LogInterceptor) // usando o interceptor em todas as rotas do controller
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async list() {
    return this.usersService.list();
  }

  @Get(':id')
  async getOne(@ParamId() id: number) {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
    return this.usersService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
    return this.usersService.updateParcial(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return this.usersService.delete(id);
  }

  // @UseInterceptors(LogInterceptor) // usando o interceptor somente na rota desejada
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }
}
