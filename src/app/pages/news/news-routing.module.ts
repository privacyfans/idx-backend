import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './news.component';
import { NewsInputsComponent } from './news-inputs/news-inputs.component';
import { ListComponent } from './list/list.component';
import { NewsViewComponent } from './view/news-view.component';
import { NewsEditComponent } from './edit/news-edit.component';


const routes: Routes = [{
  path: '',
  component: NewsComponent,
  children: [{
    path: 'inputs',
    component: NewsInputsComponent,
  },{
    path: 'list',
    component: ListComponent,
  },{
    path: 'view/:id',
    component: NewsViewComponent,
  },
  {
    path: 'update/:id',
    component: NewsEditComponent,
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
export class NewsRoutingModule {

}

export const routedComponents = [
  NewsComponent,
  NewsInputsComponent,
  ListComponent,
  NewsViewComponent,
  NewsEditComponent
  
];
