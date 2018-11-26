import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ParallaxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parallax',
  templateUrl: 'parallax.html',
})
export class ParallaxPage {

  numbers;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.numbers =  Array(200).fill(1).map((x,i)=>i);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParallaxPage');
  }

}
