import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { vheadlineRoutingModule, routedComponents } from './vheadline-routing.module';
import { vheadlineService } from '../../_services/vheadline.service';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    ThemeModule,
    vheadlineRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers:[
    vheadlineService,
  ]
})
export class vheadlineModule { }
