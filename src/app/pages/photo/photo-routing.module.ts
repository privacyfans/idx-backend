import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { photoInputsComponent } from './inputs/inputs.component';
import { ListComponent } from './list/list.component';
import { photoViewComponent } from './view/view.component';
import { photoEditComponent } from './edit/edit.component';
import { photoComponent } from './photo.component';


const routes: Routes = [{
  path: '',
  component: photoComponent,
  children: [{
    path: 'inputs',
    component: photoInputsComponent,
  },{
    path: 'list',
    component: ListComponent,
  },{
    path: 'view/:id',
    component: photoViewComponent,
  },
  {
    path: 'update/:id',
    component: photoEditComponent,
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
export class photoRoutingModule {

}

export const routedComponents = [
  photoComponent,
  photoInputsComponent,
  ListComponent,
  photoViewComponent,
  photoEditComponent
  
];
