import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    // somente para exemplo de middleware. Dá erro antes de iniciar conexão com o DB
    if (
      (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) &&
      req.method !== 'POST'
    )
      throw new BadRequestException('ID inválido!' + req.method);

    next();
  }
}
