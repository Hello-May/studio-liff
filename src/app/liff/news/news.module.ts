import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'list', component: ListComponent },
      { path: 'page', component: PageComponent },
      { path: '**', redirectTo: 'list' }
    ]),
  ]
})
export class NewsModule { }
