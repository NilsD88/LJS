import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


interface Association {
  name: string,
  points: number
}

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html'
})
export class StandingsPage {
  selectedItem: any;
  associationCollection : AngularFirestoreCollection<Association>;
  associations: Observable<Association[]>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private afs : AngularFirestore) {
      
      this.associationCollection = this.afs.collection('associations', ref => {
        return ref.orderBy('points', 'desc');
      });
      this.associations= this.associationCollection.valueChanges();

  }
  
}
