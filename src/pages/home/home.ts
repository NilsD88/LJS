import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  authenticatedUser: string

  constructor(public navCtrl: NavController) {
    this.authenticatedUser = window.localStorage.getItem('name');
  }

}
