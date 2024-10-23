import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    return this.prisma.user.create({
      data,
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async getUser(user_id: number) {
    const user = await this.prisma.user.findUnique({
      // findUnique tem melhora performance se comparado com first ou many - usado quando a coluna for unica
      where: {
        user_id,
      },
    });

    if (!user) throw new NotFoundException(`O usuário ${user_id} não existe!`);

    return user;
  }

  async update(
    user_id: number,
    { name, email, birth_date, password, role }: UpdatePutUserDTO,
  ) {
    await this.getUser(user_id);
    return this.prisma.user.update({
      // o prisma só vai alterar os campos passados.
      // Caso queira apagar caso não seja passado tem q informar EX. email: data.email || '',
      data: {
        name,
        email: email || '',
        password,
        birth_date: birth_date ? new Date(birth_date) : null,
        role,
      },
      where: {
        user_id,
      },
    });
  }

  async updateParcial(
    user_id: number,
    { birth_date, ...data }: UpdatePatchUserDTO,
  ) {
    await this.getUser(user_id);

    return this.prisma.user.update({
      data: {
        birth_date: birth_date ? new Date(birth_date) : undefined,
        ...data,
      },
      where: {
        user_id,
      },
    });
  }

  async delete(user_id: number) {
    await this.getUser(user_id);

    // caso ele tente deletar e não existir ele vai dar throw de error. necessário validar antes
    return this.prisma.user.delete({
      where: {
        user_id,
      },
    });
  }
}
