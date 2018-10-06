import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { adsComponent } from './ads.component';
import { adsInputsComponent } from './inputs/inputs.component';
import { ListComponent } from './list/list.component';
import { adsViewComponent } from './view/view.component';
import { adsEditComponent } from './edit/edit.component';


const routes: Routes = [{
  path: '',
  component: adsComponent,
  children: [{
    path: 'inputs',
    component: adsInputsComponent,
  },{
    path: 'list',
    component: ListComponent,
  },{
    path: 'view/:id',
    component: adsViewComponent,
  },
  {
    path: 'update/:id',
    component: adsEditComponent,
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
export class adsRoutingModule {

}

export const routedComponents = [
  adsComponent,
  adsInputsComponent,
  ListComponent,
  adsViewComponent,
  adsEditComponent
  
];
