import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@guards/auth.guard';
import { RoleGuard } from '@guards/role.guard';
import { createUserDTO } from '@testing/create-user-dto.mock';
import { guardMock } from '@testing/guard.mock';
import { updatePatchUserDTO } from '@testing/update-patch-user-dto.mock';
import { updatePutUserDTO } from '@testing/update-put-user-dto.mock';
import { userEntityList } from '@testing/user-entity-list.mock';
import { usersServiceMock } from '@testing/user-service.mock';
import { getPhoto } from '@testing/get-photo.mock';
import { UsersController } from '@users/users.controller';
import { UsersService } from '@users/users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [usersServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  test('Validar a definição', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('Teste da aplicação dos Guards neste controle', () => {
    test('Se os guards estão aplicados', () => {
      const guards = Reflect.getMetadata('__guards__', UsersController);

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('create method', async () => {
      const result = await usersController.create(createUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('list method', async () => {
      const result = await usersController.list();

      expect(result).toEqual(userEntityList);
    });
    test('show method', async () => {
      const result = await usersController.getOne(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('update method', async () => {
      const result = await usersController.update(updatePutUserDTO, 1);

      expect(result).toEqual(userEntityList[0]);
    });
    test('updatePartial method', async () => {
      const result = await usersController.updatePartial(updatePatchUserDTO, 1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('delete method', async () => {
      const result = await usersController.delete(1);

      expect(result).toEqual({ success: true });
    });
  });
  test('uploadPhoto method', async () => {
    const photo = await getPhoto();
    const result = await usersController.uploadPhoto(userEntityList[0], photo);
    expect(result).toEqual(photo);
  });
});
