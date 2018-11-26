import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AccountsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const FAVOURITE_KEY = 'favourite';

@Injectable()
export class StorageServiceProvider {

  constructor(private storage: Storage) {  }

  registerUser(username: string, password: string){

    let newUser = { "username": username, "password": password};
    this.storage.set('user', newUser);
  }

  isUserRegistered( _callback ) {

    this.storage.get('user').then((val) => {
      if (val != null) {
        
        _callback(true, val.username);}
      else _callback(false, null);
    });
  }

  getUsername(): string {

    this.storage.get('user').then((val) => {
      if (val != null) return val.username;
    });
  return null;
  }

  removeUser() {
    this.storage.remove('user');
  }

  addMovieToFavourites(id: string) {

    return this.getAllFavoriteFilms().then(result => {
      if (result) {
        result.push(id);
        console.log("result "+result);
        return this.storage.set(FAVOURITE_KEY, result);
      } else {
        return this.storage.set(FAVOURITE_KEY, [id]);
      }
    });
  }

  removeMovieFromFavourites(id: string) {

    return this.getAllFavoriteFilms().then(result => {
      if (result) {
        var index = result.indexOf(id);
        result.splice(index, 1);
        console.log("result "+result);
        return this.storage.set(FAVOURITE_KEY, result);
      }
    });

  }

  getAllFavoriteFilms() {
    return this.storage.get(FAVOURITE_KEY);
  }

  resetFavourites() {
    this.storage.set(FAVOURITE_KEY, []);
  }

  checkIfFavourite(id: string , _callback){

    this.getAllFavoriteFilms().then(result => {
      if(result){

        var index = result.indexOf(id);
        if(index != -1) _callback(true);
        else _callback(false);
      }
    })
  }

}
