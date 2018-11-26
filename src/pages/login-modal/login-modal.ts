import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Store } from '@ngrx/store';
import { AppState } from '../../providers/app-state/app.state';
import { ChangeStateAction } from '../../actions/logonstate.actions';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

/**
 * Generated class for the LoginModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-modal',
  templateUrl: 'login-modal.html',
})
export class LoginModalPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private store: Store<AppState>, private accountService: StorageServiceProvider,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginModalPage');
  }

  login() {

    this.accountService.registerUser(this.username, this.password);
    this.goBack();
    this.store.dispatch(new ChangeStateAction(
      {
        logState: true
      }
    ));

    let alert = this.alertCtrl.create({
      title: 'Logged In',
      subTitle: 'Welcome ' + this.username,
      buttons: ['Ok']
    });
    alert.present();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
