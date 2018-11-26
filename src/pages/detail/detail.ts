import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Navbar, LoadingController } from 'ionic-angular';

import { HttpClientProvider } from '../../providers/http-client/http-client';
import { Store } from '@ngrx/store';
import { AppState } from '../../providers/app-state/app.state';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})

export class DetailPage {

  @ViewChild(Navbar) navbar: Navbar

  loaderSpinner;

  inputIdNumber: string;

  accessState;
  username: string;

  preferite: boolean = false;
  film;

  poster_path = "https://image.tmdb.org/t/p/w500";

  title;
  id;
  posterPath;
  genre;
  overview;
  popularity;
  tagline;

  productionCompanies;

  constructor(public menu: MenuController,public navCtrl: NavController, public navParams: NavParams, 
    private httpCLient: HttpClientProvider, private store: Store<AppState>,
    private storageService: StorageServiceProvider, private loadingCtr: LoadingController) {

      this.loaderSpinner = this.loadingCtr.create({
        content: 'Loading...'
      });
      this.presentLoader();

    this.menu.enable(true, 'menuDetail');
    this.menu.enable(false, 'menuHome');
    
    this.inputIdNumber = navParams.get('data');

    this.updateAccessState();

    this.httpCLient.getFilmDetail(this.inputIdNumber).subscribe(
      (resp: Response) => {
        
        this.film = resp; //JSON.stringify(resp);

        this.genre = this.film.genres[0].name;
        this.posterPath = this.film.poster_path;
        this.overview = this.film.overview;
        this.title = this.film.title;
        this.id = this.film.id;
        this.popularity = this.film.popularity;
        this.tagline = this.film.tagline;

        this.productionCompanies = this.film.production_companies;
        
      }
    );

  }

  addFavourite() {

    this.preferite = true;
    this.storageService.addMovieToFavourites(this.id);
  }

  removeFavourite() {

    this.preferite = false;
    this.storageService.removeMovieFromFavourites(this.id);

  }

  updateAccessState() {
        this.store.select(a => a.stateAccess).subscribe(
          cw => {
            this.accessState = cw['logState'];
          }
        );
  }

  ionViewDidEnter() {

    this.storageService.checkIfFavourite(this.id, (response) => {
      this.closeLoader();
      this.preferite = response;
    });

    this.navbar.backButtonClick = (e: UIEvent)=>{
      this.menu.enable(false, 'menuDetail');
      this.menu.enable(true, 'menuHome');
      this.navCtrl.pop();
     }
  }

  presentLoader() {
    this.loaderSpinner.present()
  };
  closeLoader(){
    this.loaderSpinner.dismiss();
}

}
