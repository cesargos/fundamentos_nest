import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from '@users/dto/create-user.dto';
import { UpdatePutUserDTO } from '@users/dto/update-put-user.dto';
import { UpdatePatchUserDTO } from '@users/dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '@users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDTO) {
    if (await this.usersRepository.existsBy({ email: data.email }))
      throw new BadRequestException('Este e-mail já esta sendo usado.');

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    const user = this.usersRepository.create(data);

    return this.usersRepository.save(user);
  }

  async list() {
    return this.usersRepository.find();
  }

  async getUser(user_id: number) {
    const user = await this.usersRepository.findOneBy({
      user_id,
    });

    if (!user) throw new NotFoundException(`O usuário ${user_id} não existe!`);

    return user;
  }

  async update(
    user_id: number,
    { name, email, birth_date, password, role }: UpdatePutUserDTO,
  ) {
    await this.exists(user_id);

    if (email && (await this.usersRepository.existsBy({ email })))
      throw new BadRequestException('Este e-mail já esta sendo usado.');

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    await this.usersRepository.update(user_id, {
      name,
      email: email || '',
      password,
      birth_date: birth_date ? new Date(birth_date) : null,
      role,
    });

    return this.getUser(user_id);
  }

  async updateParcial(user_id: number, data: UpdatePatchUserDTO) {
    await this.exists(user_id);

    if (
      data.email &&
      (await this.usersRepository.existsBy({ email: data.email }))
    )
      throw new BadRequestException('Este e-mail já esta sendo usado.');

    if (data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }

    if (data.birth_date) {
      data.birth_date = new Date(data.birth_date);
    }

    await this.usersRepository.update(user_id, data);

    return this.getUser(user_id);
  }

  async delete(user_id: number) {
    const user = await this.getUser(user_id);
    if (!user?.user_id)
      throw new NotFoundException(`O usuário ${user_id} não existe`);

    // caso ele tente deletar e não existir ele vai dar throw de error. necessário validar antes
    await this.usersRepository.delete(user_id);

    return user;
  }

  async exists(user_id: number) {
    if (!(await this.usersRepository.existsBy({ user_id })))
      throw new NotFoundException(`O usuário ${user_id} não existe`);

    return true;
  }
}
