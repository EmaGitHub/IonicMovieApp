import { Component } from '@angular/core';

/**
 * Generated class for the PagesToolbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pages-toolbar',
  templateUrl: 'pages-toolbar.html'
})
export class PagesToolbarComponent {

  text: string;

  constructor() {
    console.log('Hello PagesToolbarComponent Component');
    this.text = 'Hello World';
  }

}
