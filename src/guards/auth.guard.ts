import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const tokenInfo = this.authService.checkToken(
        authorization?.split(' ')[1],
      );

      request.tokenInfo = tokenInfo;

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
