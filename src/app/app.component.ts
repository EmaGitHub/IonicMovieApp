import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, ModalController, AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginModalPage } from '../pages/login-modal/login-modal';
import { RegisterModalPage } from '../pages/register-modal/register-modal';

import { Store } from '@ngrx/store';
import { AppState } from '../providers/app-state/app.state';
import { ChangeStateAction } from '../actions/logonstate.actions';
import { FavouritesPage } from '../pages/favourites/favourites';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { ParallaxPage } from '../pages/parallax/parallax';
import { MapsPage } from '../pages/maps/maps';
import { PushNotificationPage } from '../pages/push-notification/push-notification';
import { Firebase } from '@ionic-native/firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = HomePage;

  accessState;

  showSubmenu: boolean = false;

  username: string;

  @ViewChild(Nav) nav: Nav;

  activePage: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    private menu: MenuController, private modalCtrl: ModalController, 
    private store: Store<AppState>, private storageService: StorageServiceProvider,
    private alertCtrl: AlertController, private firebase: Firebase) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleBlackTranslucent();
      splashScreen.hide();
      platform.registerBackButtonAction(() => {

        if(this.activePage == 'Home') platform.exitApp();
        else  this.goBack();
      } )

      firebase.getToken().then(token => console.log(token)).catch(err=> console.log(err));
      firebase.onNotificationOpen().subscribe(data=>{

        let alert = this.alertCtrl.create({
          title: "Notification: "+data.name+" = "+data,
          buttons: ['Ok']
        });
        alert.present();

      }, err=> console.log(err));
      this.menuHomeActive();
    });

    this.updateAccessState();    
  }

  menuHomeActive() {
    this.activePage = 'Home';
    this.menu.enable(true, 'menuHome');
    this.menu.enable(false, 'menuDetail');
  }
  menuDetailActive() {
    this.activePage = 'Detail';
    this.menu.enable(false, 'menuHome');
    this.menu.enable(true, 'menuDetail');
  }

  openLoginModal() {
    const loginModal = this.modalCtrl.create(LoginModalPage);
    this.menuItemHandler();
    loginModal.present();
    loginModal.onDidDismiss(data => {
      this.updateAccessState();
    });
  }
  openRegisterModal() {
    const modal = this.modalCtrl.create(RegisterModalPage);
    this.menuItemHandler();
    modal.present();
  }

  logout(){
    this.menuItemHandler();
    this.accessState = false;
    this.store.dispatch(new ChangeStateAction(
      {
        logState: false
      }
    ));
    this.storageService.removeUser();
    let alert = this.alertCtrl.create({
      title: 'Logged Out',
      buttons: ['Ok']
    });
    alert.present();
  }

  goBack() {
    this.nav.pop();
  }

  goBackHome() {
    this.menu.enable(false, 'menuDetail');
    this.menu.enable(true, 'menuHome');
    this.nav.push(HomePage);
  }

  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  updateAccessState() {

    this.storageService.isUserRegistered( (resp, name) => {

      if(resp == true){

        this.username = name;
        this.accessState = true;
        this.store.dispatch(new ChangeStateAction(
          {
            logState: true
          }
        )); 

      }
      else {

        this.store.select(a => a.stateAccess).subscribe(
          cw => {
            this.accessState = cw['logState'];
          }
        )
      }
    } );
  }

  navigateToFavourites() {
    this.nav.push(FavouritesPage);
  }
  navigateToParallax() {
    this.nav.push(ParallaxPage);
  }
  navigateToMaps() {
    this.nav.push(MapsPage);
  }
  navigateToPushNotification() {
    this.nav.push(PushNotificationPage);
  }
  
}

