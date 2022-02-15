import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';

import { MemberComponent } from './member.component';


@NgModule({
  declarations: [
    MemberComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedMaterialModule,
    RouterModule.forChild([
      { path: '', component: MemberComponent },
      { path: '**', redirectTo: '' }
    ])
  ]
})
export class MemberModule { }
