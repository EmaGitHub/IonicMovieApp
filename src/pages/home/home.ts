import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

import { HttpClientProvider } from '../../providers/http-client/http-client';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;

  category = "popular";
  films;
  page: number;

  constructor(public navCtrl: NavController, private httpClientProvider: HttpClientProvider) {

    this.page = 1;
    this.retrieveFilms();
  }

  retrieveFilms() {

    this.httpClientProvider.getFilms(this.category, this.page).subscribe(

      (resp: Response) => {
        this.films = resp;
      }
    );
  }

  changedCategory() {

    this.page = 1;
    this.content.scrollToTop();
    this.retrieveFilms();
  }

  previousPage() {

    this.page--;
    this.retrieveFilms();
    this.content.scrollToTop();

  }
  nextPage() {

    this.page++;
    this.retrieveFilms();
    this.content.scrollToTop();

  }

}
