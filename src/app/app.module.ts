import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { LoginModalPage } from '../pages/login-modal/login-modal';
import { RegisterModalPage } from '../pages/register-modal/register-modal';
import { HttpClientProvider } from '../providers/http-client/http-client';
import { FavouritesPage } from '../pages/favourites/favourites';

import { reducer } from '../reducers/logon.reducer';
import { StoreModule } from '@ngrx/store';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { FavouritesPageModule } from '../pages/favourites/favourites.module';
import { BaseCommonModule } from './base-common.module';
import { ParallaxPage } from '../pages/parallax/parallax';
import { MapsPage } from '../pages/maps/maps';


import { GoogleMaps } from '@ionic-native/google-maps';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Geolocation } from '@ionic-native/geolocation';
import { PushNotificationPage } from '../pages/push-notification/push-notification';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    LoginModalPage,
    RegisterModalPage,
    ParallaxPage,
    MapsPage,
    PushNotificationPage
    ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    StoreModule.forRoot({ stateAccess: reducer }),
    IonicStorageModule.forRoot(),
    IonicPageModule.forChild(FavouritesPage),
    FavouritesPageModule,
    BaseCommonModule
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    LoginModalPage,
    RegisterModalPage,
    ParallaxPage,
    MapsPage,
    PushNotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClientProvider,
    StorageServiceProvider,
    GoogleMaps,
    AndroidPermissions,
    Geolocation
  ],
  exports: [
  ]
})
export class AppModule {}
