import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  constructor(private firebase: Firebase, private alertCtrl: AlertController) {
    console.log('Hello FcmProvider Provider');  }

  startService() {

    this.firebase.getToken().then(token => console.log(" TOKEN: "+token)).catch(err=> console.log(err));
    this.firebase.onNotificationOpen().subscribe(data=>{

      let alert = this.alertCtrl.create({
        title: "Notification "+JSON.stringify(data.title)+": body="+JSON.stringify(data.body),
        buttons: ['Ok']
      });
      alert.present();

    }, err=> console.log(err));

  }

}
