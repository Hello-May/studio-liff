import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LiffService } from './liff.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
      { path: 'member', loadChildren: () => import('./member/member.module').then(m => m.MemberModule) },
      { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
      { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
      { path: '**', redirectTo: 'news' }
    ])
  ],
  providers: [
    LiffService
  ]
})
export class LiffModule { }
