import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { adsRoutingModule, routedComponents } from './ads-routing.module';
import { adsService } from '../../_services/ads.service';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    ThemeModule,
    adsRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers:[
    adsService,
  ]
})
export class adsModule { }
