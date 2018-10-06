import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { userComponent } from './user.component';
import { userInputsComponent } from './user-inputs/user-inputs.component';
import { ListComponent } from './list/list.component';
import { userViewComponent } from './view/user-view.component';
import { userEditComponent } from './edit/user-edit.component';


const routes: Routes = [{
  path: '',
  component: userComponent,
  children: [{
    path: 'inputs',
    component: userInputsComponent,
  },{
    path: 'list',
    component: ListComponent,
  },{
    path: 'view/:id',
    component: userViewComponent,
  },
  {
    path: 'update/:id',
    component: userEditComponent,
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class userRoutingModule {

}

export const routedComponents = [
  userComponent,
  userInputsComponent,
  ListComponent,
  userViewComponent,
  userEditComponent
  
];
