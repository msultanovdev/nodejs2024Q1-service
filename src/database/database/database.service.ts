import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create.user.dto';
import { CreateTrackDto } from '../../dto/create.track.dto';
import { UpdateTrackDto } from '../../dto/update.track.dto';
import { User } from '../../modules/user/user.model';
import { Track } from 'src/modules/track/track.model';
const mockUsers = [
  new User({ login: 'Amin', password: 'qwerty' }),
  new User({ login: 'Jamol', password: '12345' }),
];

const mockTracks = [
  new Track({ name: 'My love', duration: 250, artistId: null, albumId: null }),
  new Track({
    name: 'My hear go on',
    duration: 230,
    artistId: null,
    albumId: null,
  }),
];

@Injectable()
export class DatabaseService {
  usersList: User[];
  tracksList: Track[];
  constructor() {
    this.usersList = mockUsers;
    this.tracksList = mockTracks;
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

  getAllTracks() {
    return this.tracksList;
  }
  getTrackById(id: string) {
    return this.tracksList.find((track) => track.id === id);
  }
  createTrack(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);
    this.tracksList.push(track);
    return track;
  }
  updateTrack(track: Track, updateTrackDto: UpdateTrackDto) {
    track.updateTrack(updateTrackDto);
  }
  deleteTrack(id: string) {
    this.tracksList = this.tracksList.filter((track) => track.id !== id);
  }
}
