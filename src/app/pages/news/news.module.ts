import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { NewsRoutingModule, routedComponents } from './news-routing.module';
import { NewsService } from '../../_services/news.service';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    ThemeModule,
    NewsRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers:[
    NewsService,
  ]
})
export class NewsModule { }
