import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// import { SharedModule } from './shared/shared.module';
// import { SharedMaterialModule } from './shared/shared-material.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // SharedModule,
    // SharedMaterialModule,
    RouterModule.forRoot([
      { path: '', loadChildren: () => import('./liff/liff.module').then(m => m.LiffModule) },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
