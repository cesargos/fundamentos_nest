import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from '@users/dto/create-user.dto';
import { UpdatePatchUserDTO } from '@users/dto/update-patch-user.dto';
import { UpdatePutUserDTO } from '@users/dto/update-put-user.dto';
import { UsersService } from '@users/users.service';
import { ParamId } from '@decorators/param-id.decorator';
import { Roles } from '@decorators/roles.decorator';
import { Role } from '@app/enums/role.enum';
import { AuthGuard } from '@guards/auth.guard';
import { RoleGuard } from '@guards/role.guard';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { User } from '@decorators/user.decorator';
import { join } from 'path';
import { FileService } from '@app/file/file.service';
import { LogInterceptor } from '@interceptors/log.interceptor';

@UseInterceptors(LogInterceptor) // usando o interceptor em todas as rotas do controller
@Roles(Role.Admin) //  injeta a regra Role para todas as funções da controller
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileService: FileService,
  ) {}

  @Get()
  async list() {
    return this.usersService.list();
  }

  @Get(':id')
  async getOne(@ParamId() user_id: number) {
    return this.usersService.getUser(user_id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() user_id: number) {
    return this.usersService.update(user_id, data);
  }

  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchUserDTO,
    @ParamId() user_id: number,
  ) {
    return this.usersService.updateParcial(user_id, data);
  }

  // @Roles(Role.Admin, Role.User) // Caso vc queira injetar a regra para uma unica função da controller
  @Delete(':id')
  async delete(@ParamId() user_id: number) {
    return this.usersService.delete(user_id);
  }

  // @UseInterceptors(LogInterceptor) // usando o interceptor somente na rota desejada
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }

  // TRABALHANDO COM ARQUIVOS
  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @User() user,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/png' }), // aceita regex
          new MaxFileSizeValidator({ maxSize: 1024 * 50 }), // em bytes
        ],
      }),
    )
    photo: Express.Multer.File,
  ) {
    const path = join(
      __dirname,
      '..',
      '..',
      'storage',
      'photos',
      `photo-${user.user_id}.png`,
    );
    try {
      await this.fileService.upload(photo, path);
    } catch (error) {
      throw new BadRequestException(error);
    }
    return { message: 'success' };
  }

  @Post('files')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @User() user,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const path = (index) =>
      join(
        __dirname,
        '..',
        '..',
        'storage',
        'files',
        `file-${user.id}_${index}.png`,
      );
    try {
      const filesPromises = files.map((file, index) =>
        this.fileService.upload(file, path(index)),
      );
      await Promise.all(filesPromises);
    } catch (error) {
      throw new BadRequestException(error);
    }
    return { message: 'success' };
  }

  @Post('files-fields')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'photo',
        maxCount: 1,
      },
      {
        name: 'documents',
        maxCount: 10,
      },
    ]),
  )
  async uploadMultiplesFilesApart(
    @UploadedFiles()
    files: {
      photo?: Express.Multer.File[];
      documents: Express.Multer.File[];
    },
  ) {
    const photo = files.photo ? files.photo[0] : null; // foto única
    const documents = files.documents || []; // múltiplos documentos

    return {
      message: 'Arquivos recebidos com sucesso!',
      photo: photo ? photo.originalname : null,
      documents: documents.map((doc) => doc.originalname),
    };
  }
}
