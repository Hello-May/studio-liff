import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Api, LiffId } from 'src/app/shared/setting';
import * as moment from 'moment';
import { Gender, Role } from 'src/app/shared/enum';
import { LiffService } from './../liff.service';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  loading: boolean = true;
  sending: boolean = false;

  // from line
  uid!: LineUser['userId'];
  lineUser!: LineUser;

  // take member from db by uid
  member: Member | undefined;
  form!: FormGroup;

  maxDate: Date = moment().toDate();

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private liffService: LiffService,
    private http: HttpClient
  ) {
    this.title.setTitle(`學員專區`);
  }

  async ngOnInit(): Promise<void> {
    await this.initLiff();
    this.member = await this.getMember(this.uid);

    this.form = this.fb.group({
      uid: [this.uid || this.member?.uid, [Validators.required]],
      displayName: [this.member?.displayName || this.lineUser?.displayName || '', [Validators.required]],
      pictureUrl: [this.member?.pictureUrl || this.lineUser?.pictureUrl || '', [Validators.required]],
      statusMessage: [this.member?.statusMessage || this.lineUser?.statusMessage || ''],
      role: [this.member?.role || '', [Validators.required]],
      gender: [this.member?.gender || '', [Validators.required]],
      birth: [this.member?.birth || ''],
      phone: [this.member?.phone || '', [Validators.pattern(/^09\d{8}$/)]],
      email: [this.member?.email || '', [Validators.email]],
      aboutMe: [this.member?.aboutMe || '']
    });

    console.log('this.form', this.form.value);
    this.loading = false;
  }

  private async initLiff() {
    await this.liffService.initLiff(LiffId.member);
    if (!this.liffService.isLoggedIn()) {
      this.liffService.login();
      return;
    }
    this.uid = this.liffService.profile.userId || 'Ue7239b947f52a9648e608c54a51ab631';
    this.lineUser = this.liffService.profile;
    console.log('this.lineUser', this.lineUser);
    if (!this.uid) throw Error('此APP不支援外部瀏覽器模式');
  }

  private async getMember(uid: LineUser['userId']) {
    try {
      const result = await this.http.get(`https://test.may.services/api/member/${uid}`).toPromise() as Member;
      console.log('getMember result', result);
      return result;
    } catch (error) {
      console.log('getMember error', error);
      return undefined;
    }
  }

  async _btnSave() {
    if (confirm('確定儲存？')) {
      this.sending = true;
      try {
        const data = {
          ...this.form.value,
          birth: moment(this.form.get('birth')?.value).format('YYYY-MM-DD')
        };
        console.log('_btnSave data', data);
        const result = this.member ?
          await this.http.patch(`${Api.backend_dev}/member/${this.uid}`, data, { responseType: 'text' }).toPromise() :
          await this.http.post(`${Api.backend_dev}/member`, data, { responseType: 'text' }).toPromise();
        console.log('_btnSave result', result);
        alert('已儲存');
      } catch (error) {
        console.log('_btnSave error', _.get(error, 'status') ?? '??', error);
        alert('儲存失敗，請稍候再試⋯⋯');
      }
      this.sending = false;
    }
  }

  _btnClose() {
    liff.closeWindow();
  }

  get Role() { return Role; }
  get roleList() { return Object.values(Role); }
  get genderList() { return Object.values(Gender); }

}
