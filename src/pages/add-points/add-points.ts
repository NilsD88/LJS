import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


interface Association {
  id: string,
  name: string,
  points: number
}

interface Activity{
  id: string
  name: string,
  ordering: string,
  scoreType: string,
  top3?: Array<any>,
  responsables: Array<string>
}



@Component({
  selector: 'page-add-points',
  templateUrl: 'add-points.html',
})
export class AddPointsPage {

  activity: Activity;
  associationCollection: AngularFirestoreCollection<Association>;
  associations: Observable<Association[]>;
  activityDoc: AngularFirestoreDocument<Activity>
  associationDoc: AngularFirestoreDocument<Association>
  associationsList : Association[];
  
  points: {
    association: string,
    amount: number
  }
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public afs: AngularFirestore) {
      this.activity = navParams.get('item');

      this.points = {
        association : '',
        amount : 0
      }

      this.associationCollection = this.afs.collection('associations');
      this.associations = this.associationCollection.valueChanges();
      this.associations.subscribe(data => {
        this.associationsList = data;
      })
  }

  savePoints(){
    
    if(this.activity.top3){
      var top3 = this.activity.top3;
      var ordering = this.activity.ordering;
        if(ordering === "asc"){
            top3.push(this.points);
            top3.sort((a, b) => {
              return a.amount - b.amount;
             })
        }else if(ordering === "desc"){  
            top3.push(this.points);
            top3.sort((b, a) => {
              return a.amount - b.amount;
            })
        }
        top3.splice(3, 10);
        
        this.activityDoc = this.afs.doc('activities/'+this.activity.id);
        this.activityDoc.update({top3 : top3});
        this.navCtrl.pop();

      }else{
        var selectedAssociation;

        for(var i = 0; i< this.associationsList.length; i++){
          if(this.associationsList[i].name === this.points.association){
            selectedAssociation = this.associationsList[i];
          }
        }
        this.associationDoc = this.afs.doc('associations/'+selectedAssociation.id);
        var pointsAmount = parseInt(this.points.amount.toString());
        var newPoints:number = + selectedAssociation.points + pointsAmount;
        this.associationDoc.update({points : newPoints});
        this.navCtrl.pop();
      }

    
  }

  

}
