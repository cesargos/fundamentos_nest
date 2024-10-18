import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

// a função tap pega exatamente o que retornou do handle, executa algom e depois retorna exatamento o handler
import { tap } from 'rxjs/operators';

export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const initialDate = Date.now();
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        console.log(
          `A Execução da rota "${request.method} ${request.url}" levou: ${Date.now() - initialDate} ms`,
        );
      }),
    );
  }
}
