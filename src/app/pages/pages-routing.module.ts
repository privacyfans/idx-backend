import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../_guards';
const routes: Routes = [{
  path: '', 
  component: PagesComponent,canActivate: [AuthGuard],
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,canActivate: [AuthGuard],
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',canActivate: [AuthGuard],
    },{
      path: 'forms',
      loadChildren: './forms/forms.module#FormsModule',canActivate: [AuthGuard],
    },
    {
      path: 'news',
      loadChildren: './news/news.module#NewsModule',canActivate: [AuthGuard],
    },
    {
      path: 'vidnews',
      loadChildren: './vidnews/vidnews.module#vidnewsModule',canActivate: [AuthGuard],
    },
    {
      path: 'vheadline',
      loadChildren: './vheadline/vheadline.module#vheadlineModule',canActivate: [AuthGuard],
    },
    {
      path: 'ads',
      loadChildren: './ads/ads.module#adsModule',canActivate: [AuthGuard],
    },
    {
      path: 'photo',
      loadChildren: './photo/photo.module#photoModule',canActivate: [AuthGuard],
    },
    {
      path: 'user',
      loadChildren: './user/user.module#userModule',canActivate: [AuthGuard],
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
