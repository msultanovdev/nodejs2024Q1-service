import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create.user.dto';
import { User } from '../../modules/user/user.model';
//

const mockUsers = [
  new User({ password: '1234', login: 'Oleg' }),
  new User({ password: '1234', login: 'Artem' }),
];

@Injectable()
export class DatabaseService {
  usersList: User[];
  constructor() {
    this.usersList = mockUsers;
  }
  getAllUsers() {
    return this.usersList;
  }
  getUserById(id: string) {
    return this.usersList.find((user) => user.id === id);
  }
  createUser(createUserDto: CreateUserDto) {
    const newUser = new User(createUserDto);
    this.usersList.push(newUser);
    const response = { ...newUser };
    delete response.password;
    return response;
  }
  updateUser(user: User, newPass: string) {
    user.updatePassword(newPass);
    const response = { ...user };
    delete response.password;
    return response;
  }
  deleteUser(id: string) {
    this.usersList = this.usersList.filter((user) => user.id !== id);
  }
}
