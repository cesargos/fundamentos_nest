import { IsJWT, IsStrongPassword } from 'class-validator';

export class AuthResetDTO {
  @IsStrongPassword(
    {
      minLength: 8,

      // é necessário informar q não precisa ter a quantidade minima pois por defaul é 1
      minLowercase: 0,
      minNumbers: 1,
      minSymbols: 0,
      minUppercase: 1,
    },
    {
      message:
        '"password" deve ser forte, com pelo menos 8 caracteres, um número, uma letra maiúscula',
    },
  )
  password: string;

  @IsJWT()
  token: string;
}
