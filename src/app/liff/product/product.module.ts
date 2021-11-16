import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      // { path: 'embassy', component: EmbassyComponent },
      // { path: 'passportApplication', component: PassportApplicationComponent },
      // { path: 'passportScanQR', component: PassportScanQRComponent }
    ]),
  ]
})
export class ProductModule { }
