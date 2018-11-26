import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

import { DetailPage } from '../detail/detail';
import { HttpClientProvider } from '../../providers/http-client/http-client';
import { HomePage } from '../home/home';

/**
 * Generated class for the FavouritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {

  films;
  poster_path = "https://image.tmdb.org/t/p/w500";


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storageService: StorageServiceProvider, private alertCtrl: AlertController,
    private httpClient: HttpClientProvider) {
  }

  ionViewWillEnter() { 

    this.storageService.isUserRegistered((response) => {    //se ci siamo sloggati e torniamo su preferiti con back
      if(response == false) this.goToHome();
    } );
    this.updateFavouritesList();
  }

  ionViewWillLeave() {
    this.films = [];
  }

  resetPreferites() {
      this.storageService.resetFavourites();

      let alert = this.alertCtrl.create({
        title: 'Favourites',
        subTitle: 'All favourites are deleted ',
        buttons: ['Ok']
      });
      alert.present();

      this.films = [];
  }

  updateFavouritesList() {
    this.storageService.getAllFavoriteFilms().then(
      (result) => {
        this.httpClient.getFavouriteFilms(result, (favouriteFilms) => this.films = favouriteFilms);

      }
    )
  }

  navigateToDetail(id) {

    this.navCtrl.push(DetailPage, {
      data: id
    });
  }

  goToHome() {
    this.navCtrl.push(HomePage);
  }

}
