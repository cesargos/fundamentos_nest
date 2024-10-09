import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,

      // é necessário informar q não precisa ter a quantidade minima pois por defaul é 1
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'A senha deve ser forte, com pelo menos 8 caracteres, um número, uma letra maiúscula, uma letra minúscula e um símbolo',
    },
  )
  password: string;
}
