import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  private audience = 'users';
  private issuer = 'auth';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  createToken(user: User) {
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
    console.log({ email, password });
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) throw new UnauthorizedException('E-mail e/ou senha incorretos!');

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) throw new BadRequestException('O e-mail está incorreto!');

    // TODO: enviar email de reset de senha

    return true;
  }

  async reset(password: string, token: string) {
    console.log(token);
    // TODO: Validar token e pegar o user_id
    const user_id = 0;
    const user = await this.prisma.user.update({
      where: {
        user_id,
      },
      data: {
        password,
      },
    });
    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.usersService.create(data);
    return this.createToken(user);
  }
}
