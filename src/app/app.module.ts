import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { LJS } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StandingsPage } from '../pages/standings/standings';
import { ActivitiesPage } from '../pages/activities/activities';
import { ActivityDetailPage } from '../pages/activity-detail/activity-detail';
import { ActivityDetailPageModule } from '../pages/activity-detail/activity-detail.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ENV } from '../environment';
import { AddPointsPage } from '../pages/add-points/add-points';
import { LoginPage } from '../pages/login/login';


@NgModule({
  declarations: [
    LJS,
    HomePage,
    StandingsPage,
    ActivitiesPage,
    AddPointsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ActivityDetailPageModule,
    IonicModule.forRoot(LJS),
    AngularFireModule.initializeApp(ENV.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LJS,
    HomePage,
    StandingsPage, 
    ActivitiesPage,
    ActivityDetailPage,
    AddPointsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
