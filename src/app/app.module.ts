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
import { DatabaseProvider } from '../providers/database/database';
import { ActivityDetailPage } from '../pages/activity-detail/activity-detail';
import { ActivityDetailPageModule } from '../pages/activity-detail/activity-detail.module';

@NgModule({
  declarations: [
    LJS,
    HomePage,
    StandingsPage,
    ActivitiesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ActivityDetailPageModule,
    IonicModule.forRoot(LJS),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LJS,
    HomePage,
    StandingsPage, 
    ActivitiesPage,
    ActivityDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
