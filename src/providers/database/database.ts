import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


// We MUST import both the firebase AND firestore modules like so
import * as firebase from 'firebase';
import 'firebase/firestore';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  /**
    * @name _DB
    * @type {object}
    * @private
    * @description     Defines an object for handling interfacing with the
    				   Cloud Firestore database service
    */
  private _DB: any;

  constructor(public http: HttpClient) {
    this._DB = firebase.firestore();
  }

  getActivities() : Promise<any>
   {
      return new Promise((resolve, reject) =>
      {
         this._DB.collection("activities")
         .get()
         .then((querySnapshot) =>
         {
            // Declare an array which we'll use to store retrieved documents
            let obj : any = [];

            // Iterate through each document, retrieve the values for each field
            // and then assign these to a key in an object that is pushed into the
            // obj array
            querySnapshot
            .forEach((doc : any) =>
            {
                obj.push({
                   id             : doc.id,
                   name           : doc.data().name,
                   ordering       : doc.data().ordering,
                   scoreType      : doc.data().scoreType,
                   top3           : doc.data().top3,
                   responsables   : doc.data().responsables
                });
            });
            // Resolve the completed array that contains all of the formatted data
            // from the retrieved documents
            resolve(obj);
         })
         .catch((error : any) =>
         {
            reject(error);
         });
      });
   }

   getAssociations() : Promise<any>
   {
      return new Promise((resolve, reject) =>
      {
         this._DB.collection("associations")
         .get()
         .then((querySnapshot) =>
         {
            // Declare an array which we'll use to store retrieved documents
            let obj : any = [];

            // Iterate through each document, retrieve the values for each field
            // and then assign these to a key in an object that is pushed into the
            // obj array
            querySnapshot
            .forEach((doc : any) =>
            {
                obj.push({
                   id             : doc.id,
                   name           : doc.data().name,
                   points         : doc.data().points
                });
            });
            // Resolve the completed array that contains all of the formatted data
            // from the retrieved documents
            resolve(obj);
         })
         .catch((error : any) =>
         {
            reject(error);
         });
      });
   }

}
