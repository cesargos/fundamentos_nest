import { CreateUserDTO } from '@users/dto/create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePatchUserDTO extends PartialType(CreateUserDTO) {}
