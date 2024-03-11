import { v4 as uuid } from 'uuid';
import { CreateUserDto } from '../../dto/create.user.dto';

export class User {
  readonly id: string;
  readonly createdAt: number;
  readonly login: string;
  password: string;
  version: number;
  updatedAt: number;
  constructor({ password, login }: CreateUserDto) {
    this.id = uuid();
    this.createdAt = Date.now();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.updatedAt = this.createdAt;
  }
  updatePassword(newPass: string) {
    this.password = newPass;
    this.version = this.version += 1;
    this.updatedAt = Date.now();
  }
}
