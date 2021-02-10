import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileAddComponent } from './file-add/file-add.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  
  },
  {
    path: 'fileadd',
    component: FileAddComponent,
  
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
