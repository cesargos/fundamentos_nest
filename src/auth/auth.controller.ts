import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthLoginDTO } from '@auth/dto/auth-login.dto';
import { AuthForgetDTO } from '@auth/dto/auth-forget.dto';
import { AuthRegisterDTO } from '@auth/dto/auth-register.dto';
import { AuthResetDTO } from '@auth/dto/auth-reset.dto';
import { AuthService } from '@auth/auth.service';
import { AuthGuard } from '@guards/auth.guard';
import { User } from '@decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() data: AuthRegisterDTO) {
    return this.authService.register(data);
  }

  @Post('forget')
  @HttpCode(200)
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  @HttpCode(200)
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  @HttpCode(200)
  async me(@User('email') email: string, @User() user: any) {
    return { user, email };
  }
}
