import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


interface LoginObject{
  name: string;
  pass: string;
}

interface User{
  name: string;
  pass: string;
}


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login : LoginObject = {
    name: '',
    pass: ''
  };

  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userList : User[];

  usernameNotFound: boolean;
  wrongPassword: boolean;

  isAuthenticated : string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public afs: AngularFirestore,
    public alertCtrl: AlertController) {

      this.userCollection = this.afs.collection('users');
      this.users = this.userCollection.valueChanges();
      this.users.subscribe(data => {
        this.userList = data;
      })

      this.isAuthenticated = window.localStorage.getItem('authenticated');
  }

  logoutFunction(){
    window.localStorage.removeItem('authenticated');
    window.localStorage.removeItem('name');
    this.navCtrl.setRoot(HomePage);
  }
  
  loginFunction() {
      var user: User;
      this.userList.forEach(element => {
        
        if(element.name === this.login.name){
          user = element;
        }
      });

      if(!user){
        let alert = this.alertCtrl.create({
          title: 'Gebruiker bestaat niet!',
          subTitle: 'Gebruiker bestaat niet! Contacteer Nils als je denkt dat er iets fout gelopen is.',
          buttons: ['OK']
        });
        alert.present();
      }else{
        if(this.login.pass === user.pass){
          window.localStorage.setItem('name', user.name);
          window.localStorage.setItem('authenticated', 'true');
          this.navCtrl.setRoot(HomePage);
        }else{
          let alert = this.alertCtrl.create({
            title: 'Verkeerd wachtwoord!',
            subTitle: 'Verkeerd wachtwoord! Als je het niet meer weet: contacteer Nils.',
            buttons: ['OK']
          });
          alert.present();
        }
      }

      
  }

}
