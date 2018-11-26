import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavouritesPage } from './favourites';
import { BaseCommonModule } from '../../app/base-common.module';


@NgModule({
  declarations: [
    FavouritesPage,
  ],
  imports: [
    IonicPageModule.forChild(FavouritesPage),
    BaseCommonModule
  ],
})
export class FavouritesPageModule {}
