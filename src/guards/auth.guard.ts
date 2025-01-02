import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { UsersService } from '@users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const tokenInfo = this.authService.checkToken(
        authorization?.split(' ')[1],
      );

      request.tokenInfo = tokenInfo;

      request.user = await this.usersService.getUser(tokenInfo.user_id);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
