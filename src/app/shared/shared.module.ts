import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from './shared-material.module';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
// import { TransformLinkHtmlPipe } from './pipe/transform-link-html.pipe';
// import { MessageBoxComponent } from './component/message-box/message-box.component';
// import { UnitLabelComponent } from './component/unit-label/unit-label.component';
// import { MemberDisplayNameComponent } from './component/member-display-name/member-display-name.component';
// import { EditMemberDisplayNameComponent } from './dialogBox/edit-member-display-name/edit-member-display-name.component';
// import { MessageBoxChoosePictureComponent } from './dialogBox/message-box-choose-picture/message-box-choose-picture.component';
// import { PrivacyPolicyDialogComponent } from './dialogBox/privacy-policy-dialog/privacy-policy-dialog.component';
// import { SafeUrlPipe } from './pipe/safe-url-pipe.pipe';
// import { TextLengthPipe } from './pipe/text-length-pipe.pipe';
// import { SurveyComponent } from './component/survey/survey.component';
// import { SurveyService } from './component/survey/survey.service';



@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    // TransformLinkHtmlPipe,
    // SafeUrlPipe,
    // TextLengthPipe,
    // MessageBoxComponent,
    // UnitLabelComponent,
    // MemberDisplayNameComponent,
    // EditMemberDisplayNameComponent,
    // MessageBoxChoosePictureComponent,
    // PrivacyPolicyDialogComponent,
    // SurveyComponent,
  ],
  exports: [
    // TransformLinkHtmlPipe,
    // SafeUrlPipe,
    // TextLengthPipe,
    // MessageBoxComponent,
    // UnitLabelComponent,
    ReactiveFormsModule,
    // MemberDisplayNameComponent,
    // EditMemberDisplayNameComponent,
    // MessageBoxChoosePictureComponent,
    // PrivacyPolicyDialogComponent,
    // SurveyComponent,
  ],
  providers: [
    FormBuilder,
    // SurveyService,
  ],
  entryComponents: [
    // EditMemberDisplayNameComponent,
    // MessageBoxChoosePictureComponent
  ]
})
export class SharedModule { }
