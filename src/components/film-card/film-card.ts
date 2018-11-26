import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../../pages/detail/detail';

/**
 * Generated class for the FilmCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'film-card',
  templateUrl: 'film-card.html'
})
export class FilmCardComponent {

  @Input() film: string;
  poster_path = "https://image.tmdb.org/t/p/w500";

  constructor(private navCtrl: NavController) {
  }

  navigateToDetail(id) {

    this.navCtrl.push(DetailPage, {
      data: id
    });
  }

}
