import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParallaxPage } from './parallax';

@NgModule({
  declarations: [
    ParallaxPage,
  ],
  imports: [
    IonicPageModule.forChild(ParallaxPage),
  ],
})
export class ParallaxPageModule {}
