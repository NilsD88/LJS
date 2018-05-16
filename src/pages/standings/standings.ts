import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html'
})
export class StandingsPage {
  selectedItem: any;
  items: Array<{title: string, note: string, icon: string}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _DB : DatabaseProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    

    this.items = [];
  }

  ionViewDidEnter(){
      this.retrieveAssociations();
   }

   retrieveAssociations() : void{
      this._DB.getAssociations()
      .then((data) =>
      {
        data.sort((b, a) =>{
          return a.points - b.points;
        });
        this.items = data;
         
      })
      .catch();
   }

   
  
}
