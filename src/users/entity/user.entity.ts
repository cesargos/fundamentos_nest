import { Role } from '@app/enums/role.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  user_id: number;

  @Column({
    length: 63,
  })
  name: string;

  @Column({
    length: 127,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  birth_date?: Date;

  @CreateDateColumn()
  createdAt: string | Date;

  @UpdateDateColumn()
  updatedAt: string | Date;

  @Column({
    default: Role.User,
  })
  role: number;
}
