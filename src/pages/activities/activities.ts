import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ActivityDetailPage } from '../activity-detail/activity-detail';

@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html'
})
export class ActivitiesPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _DB: DatabaseProvider ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.items = [];
    
  }

  showDetails($event, item) {
    this.navCtrl.push(ActivityDetailPage, {
      item: item
    });
  }

  ionViewDidEnter(){
    this.retrieveActivities();
  }

  retrieveActivities() : void{
    this._DB.getActivities()
    .then((data) =>
    {
      this.items = data;
    })
    .catch();
 }

}
