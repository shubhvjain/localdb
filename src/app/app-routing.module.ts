import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", redirectTo:"/setup" ,pathMatch: 'full'},
  { path: 'd', loadChildren: () => import('./database/database.module').then(m => m.DatabaseModule) },
   { path: 'setup', loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule) }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
