import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatabaseComponent } from './database.component';
import { ViewerComponent } from './viewer/viewer.component';
const routes: Routes = [
  { path: '', component: DatabaseComponent },
  { path: 'v/:dbname', component: DashboardComponent },
  { path: 'v/:dbname/:appname', component: ViewerComponent },
  { path: 'v/:dbname/:appname/:id', component: ViewerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatabaseRoutingModule { }
