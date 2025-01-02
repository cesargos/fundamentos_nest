import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@users/users.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from '@users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private audience = 'users';
  private issuer = 'auth';

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailer: MailerService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  createToken(user: UserEntity) {
    const accessToken = this.jwtService.sign(
      {
        user_id: user.user_id,
        email: user.email,
        name: user.name,
      },
      {
        expiresIn: '4h',
        subject: String(user.user_id),
        audience: this.audience,
        issuer: this.issuer,
      },
    );
    return { accessToken };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });
      console.log({ data });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const salt = await bcrypt.genSalt();
    console.log({ salt, email, password });
    const user = await this.usersRepository.findOneBy({
      email,
    });

    console.log({ user });
    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('E-mail e/ou senha incorretos!');

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (!user) throw new BadRequestException('O e-mail está incorreto!');

    const token = this.jwtService.sign(
      {
        user_id: user.user_id,
        email: user.email,
        name: user.name,
      },
      {
        expiresIn: '30 minutes',
        subject: String(user.user_id),
        audience: this.audience,
        issuer: 'forget',
      },
    );

    await this.mailer.sendMail({
      subject: 'Recuperação de Senha',
      to: user.email,
      template: 'forget',
      context: {
        name: user.name,
        token,
      },
    });

    return { message: 'Email enviado com sucesso!' };
  }

  async reset(password: string, token: string) {
    try {
      const { user_id } = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: 'forget',
      });

      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(password, salt);

      const updateResult = await this.usersRepository.update(user_id, {
        password,
      });

      console.log(updateResult);
      const user = await this.usersService.getUser(user_id);

      return this.createToken(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.usersService.create(data);
    return this.createToken(user);
  }
}
