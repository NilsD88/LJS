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
  selector: 'page-add-points',
  templateUrl: 'add-points.html',
})
export class AddPointsPage {

  item;
  associationCollection: AngularFirestoreCollection<Association>;
  associations: Observable<Association[]>
  points: {
    association: string,
    amount: number
  }
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public afs: AngularFirestore) {
      this.item = navParams.get('item');

      this.points = {
        association : '',
        amount : 0
      }

      this.associationCollection = this.afs.collection('associations');
      this.associations= this.associationCollection.valueChanges();

      
  }

  

}
