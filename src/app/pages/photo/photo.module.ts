import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { photoRoutingModule, routedComponents } from './photo-routing.module';
import { photoService } from '../../_services/photo.service';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    ThemeModule,
    photoRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers:[
    photoService,
  ]
})
export class photoModule { }
