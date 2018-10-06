import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { vidnewsRoutingModule, routedComponents } from './vidnews-routing.module';
import { VidnewsService } from '../../_services/vidnews.service';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    ThemeModule,
    vidnewsRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers:[
    VidnewsService,
  ]
})
export class vidnewsModule { }
