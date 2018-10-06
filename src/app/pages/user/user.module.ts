import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { userRoutingModule, routedComponents } from './user-routing.module';
import { UserService } from '../../_services/user.service';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    ThemeModule,
    userRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers:[
    UserService,
  ]
})
export class userModule { }
