import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create.user.dto';
import { CreateTrackDto } from '../../dto/create.track.dto';
import { UpdateTrackDto } from '../../dto/update.track.dto';
import { User } from '../../modules/user/user.model';
import { Track } from 'src/modules/track/track.model';
import { Artist } from 'src/modules/artist/artist.model';
import { CreateArtistDto } from 'src/dto/create.artist.dto';
import { UpdateArtistDto } from 'src/dto/update.artist.dto';
import { Album } from 'src/modules/album/album.model';
import { CreateAlbumDto } from 'src/dto/create.album.dto';
import { UpdateAlbumDto } from 'src/dto/update.album.dto';
const initUsers = [
  new User({ login: 'Amin', password: 'qwerty' }),
  new User({ login: 'Jamol', password: '12345' }),
];

const initTracks = [
  new Track({ name: 'My love', duration: 250, artistId: null, albumId: null }),
  new Track({
    name: 'My hear go on',
    duration: 230,
    artistId: null,
    albumId: null,
  }),
];

const initArtits = [
  new Artist({ name: 'The Weekend', grammy: false }),
  new Artist({ name: 'Lil', grammy: true }),
];

const initAlbums = [
  new Album({ name: 'Little Summer', year: 1998, artistId: 'artist-uuid-1' }),
  new Album({ name: 'Juice', year: 1985, artistId: 'artist-uuid-2' }),
];

@Injectable()
export class DatabaseService {
  usersList: User[];
  tracksList: Track[];
  artistsList: Artist[];
  albumsList: Album[];
  constructor() {
    this.usersList = initUsers;
    this.tracksList = initTracks;
    this.artistsList = initArtits;
    this.albumsList = initAlbums;
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

  getAllArtists() {
    return this.artistsList;
  }
  getArtistById(id: string) {
    return this.artistsList.find((artist) => artist.id === id);
  }
  createArtist(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto);
    this.artistsList.push(artist);
    return artist;
  }
  updateArtist(artist: Artist, updateArtistDto: UpdateArtistDto) {
    artist.updateArtist(updateArtistDto);
  }
  deleteArtist(id: string) {
    this.artistsList = this.artistsList.filter((artist) => artist.id !== id);
  }
  getAllAlbums() {
    return this.albumsList;
  }
  getAlbumById(id: string) {
    return this.albumsList.find((album) => album.id === id);
  }
  createAlbum(createAlbumDto: CreateAlbumDto) {
    const album = new Album(createAlbumDto);
    this.albumsList.push(album);
    return album;
  }
  updateAlbum(album: Album, updateAlbumDto: UpdateAlbumDto) {
    album.updateAlbum(updateAlbumDto);
  }
  deleteAlbum(id: string) {
    this.albumsList = this.albumsList.filter((album) => album.id !== id);
  }
}
