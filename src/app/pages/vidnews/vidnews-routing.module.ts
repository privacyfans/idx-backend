import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { vidnewsComponent } from './vidnews.component';
import { VidnewsInputsComponent } from './vidnews-inputs/vidnews-inputs.component';
import { ListComponent } from './list/list.component';
import { vidnewsViewComponent } from './view/vidnews-view.component';
import { vidnewsEditComponent } from './edit/vidnews-edit.component';


const routes: Routes = [{
  path: '',
  component: vidnewsComponent,
  children: [{
    path: 'inputs',
    component: VidnewsInputsComponent,
  },{
    path: 'list',
    component: ListComponent,
  },{
    path: 'view/:id',
    component: vidnewsViewComponent,
  },
  {
    path: 'update/:id',
    component: vidnewsEditComponent,
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
export class vidnewsRoutingModule {

}

export const routedComponents = [
  vidnewsComponent,
  VidnewsInputsComponent,
  ListComponent,
  vidnewsViewComponent,
  vidnewsEditComponent
  
];
