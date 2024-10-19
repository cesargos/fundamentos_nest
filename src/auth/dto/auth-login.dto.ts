import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 1,

    // é necessário informar q não precisa ter a quantidade minima pois por defaul é 1
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;
}
