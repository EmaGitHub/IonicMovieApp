import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterModalPage } from './register-modal';

@NgModule({
  declarations: [
    RegisterModalPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterModalPage),
  ],
})
export class RegisterModalPageModule {}
