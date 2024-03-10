import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create.user.dto';
import { UpdateUserDto } from '../../dto/update.user.dto';
import { DatabaseService } from '../../database/database/database.service';
import { validate as uuidValidate } from 'uuid';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const dto = new CreateUserDto(createUserDto);

    const validationErrors = await validate(dto);

    if (validationErrors.length > 0) {
      const message = 'Something wrong :(';
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
    const newUser = this.databaseService.createUser(dto);
    return newUser;
  }

  findAll() {
    return this.databaseService.getAllUsers();
  }

  findOne(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const user = this.databaseService.getUserById(id);
      if (user) return user;
      const message = `User with ${id} wasn't found in database`;
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
    throw new HttpException('Invalid ID (not uuid)', HttpStatus.BAD_REQUEST);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const dto = new UpdateUserDto(updateUserDto);

      const validationErrors = await validate(dto);

      if (validationErrors.length > 0) {
        const message = 'Something wrong :(';
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }

      const user = this.databaseService.getUserById(id);
      if (user) {
        if (dto.oldPassword === user.password) {
          const res = this.databaseService.updateUser(user, dto.newPassword);
          return res;
        }
        throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);
      }
      throw new HttpException('', HttpStatus.NOT_FOUND);
    }
    throw new HttpException(
      `User with ${id} wasn't found in database`,
      HttpStatus.BAD_REQUEST,
    );
  }

  remove(id: string) {
    const isValidId = uuidValidate(id);
    if (isValidId) {
      const user = this.databaseService.getUserById(id);
      if (user) {
        this.databaseService.deleteUser(id);
        return;
      }
      throw new HttpException(
        `User with ${id} wasn't found in database`,
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Invalid ID (not uuid)', HttpStatus.BAD_REQUEST);
  }
}
