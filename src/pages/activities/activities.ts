import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActivityDetailPage } from '../activity-detail/activity-detail';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Activity{
    id?: string
    name: string,
    ordering: string,
    scoreType: string,
    top3: Array<any>,
    responsables: Array<string>
}

@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html'
})
export class ActivitiesPage {
  selectedItem: any;
  activitiesCollection : AngularFirestoreCollection<Activity>;
  activities: Observable<Activity[]>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    afs: AngularFirestore) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.activitiesCollection = afs.collection('/activities');
      this.activities = this.activitiesCollection.valueChanges();
  }

  showDetails($event, item) {
    this.navCtrl.push(ActivityDetailPage, {
      item: item
    });
  }

}
