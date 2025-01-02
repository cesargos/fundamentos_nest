import { Role } from '@app/enums/role.enum';
import { UpdatePatchUserDTO } from '@users/dto/update-patch-user.dto';

export const updatePatchUserDTO: UpdatePatchUserDTO = {
  role: Role.Admin,
};
