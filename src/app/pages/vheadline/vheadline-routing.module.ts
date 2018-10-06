import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { vheadlineComponent } from './vheadline.component';
import { vheadlineInputsComponent } from './inputs/inputs.component';
import { ListComponent } from './list/list.component';
import { vheadlineViewComponent } from './view/view.component';
import { vheadlineEditComponent } from './edit/edit.component';


const routes: Routes = [{
  path: '',
  component: vheadlineComponent,
  children: [{
    path: 'inputs',
    component: vheadlineInputsComponent,
  },{
    path: 'list',
    component: ListComponent,
  },{
    path: 'view/:id',
    component: vheadlineViewComponent,
  },
  {
    path: 'update/:id',
    component: vheadlineEditComponent,
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
export class vheadlineRoutingModule {

}

export const routedComponents = [
  vheadlineComponent,
  vheadlineInputsComponent,
  ListComponent,
  vheadlineViewComponent,
  vheadlineEditComponent
  
];
