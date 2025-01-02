import { Role } from '@app/enums/role.enum';
import { UserEntity } from '@users/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    name: 'Joao Rangel',
    email: 'joao@hcode.com.br',
    birth_date: new Date('2000-01-01'),
    user_id: 1,
    password: '$2b$10$KTCMumuAvsZcxgEXCA4.x.sqeqtrWXmB7ptFGkF.f32XW3OE3Awb6',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Glaucio Daniel',
    email: 'glaucio@hcode.com.br',
    birth_date: new Date('2000-01-01'),
    user_id: 2,
    password: '$2b$10$KTCMumuAvsZcxgEXCA4.x.sqeqtrWXmB7ptFGkF.f32XW3OE3Awb6',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Djalma Sindaux',
    email: 'djalma@hcode.com.br',
    birth_date: new Date('2000-01-01'),
    user_id: 3,
    password: '$2b$10$KTCMumuAvsZcxgEXCA4.x.sqeqtrWXmB7ptFGkF.f32XW3OE3Awb6',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
