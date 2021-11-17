import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { dev, LiffId } from 'src/app/shared/setting';
import * as moment from 'moment';
import { Gender, Role } from 'src/app/shared/enum';

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
  ) {
    this.title.setTitle(`學員專區`);
  }

  async ngOnInit(): Promise<void> {
    if (dev.local) {
      this.uid = dev.uid;
      this.lineUser = {
        userId: dev.uid,
        displayName: dev.displayName,
        pictureUrl: 'https://my.picture',
        statusMessage: '',
        phone: '0988777666'
      };
    } else {
      // init liff
      // -> backend -> update lineUser
    }

    const result = await this.getMember(this.uid);
    this.member = result.data;

    this.form = this.fb.group({
      // userId: [this.uid, [Validators.required]],
      displayName: [this.member?.displayName || this.lineUser?.displayName || '', [Validators.required]],
      pictureUrl: [this.member?.pictureUrl || this.lineUser?.pictureUrl || '', [Validators.required]],
      statusMessage: [this.member?.statusMessage || this.lineUser?.statusMessage || ''],
      role: [this.member?.role || '', [Validators.required]],
      gender: [this.member?.gender || '', [Validators.required]],
      birth: [this.member?.birth || ''],
      phone: [this.member?.phone || this.lineUser?.phone || '', [Validators.pattern(/^09\d{8}$/)]],
      email: [this.member?.email || '', [Validators.email]],
      aboutMe: [this.member?.aboutMe || '']
    });

    if (result.status === '200') this._btnEdit(false);
    else this._btnEdit(true);

    console.log('this.form', this.form.value);
    this.loading = false;
  }

  private getMember(uid: LineUser['userId']) {
    // 取得 uid 後，打後端拿 member，我想用訂閱方式刷新畫面
    return { status: '400', message: 'error', data: undefined };
    return {
      status: '200', message: 'success', data: {
        userId: dev.uid,
        displayName: dev.displayName,
        pictureUrl: 'https://my.picture',
        statusMessage: 'ya~',
        role: Role.trainee,
        gender: Gender.female,
        birth: new Date('2000/5/5'),
        phone: '0988777666',
        email: 'may@abc.com',
        aboutMe: 'blabla',
        createdAt: new Date(),
        updatedAt: new Date()
      } as Member
    };
  }

  _btnEdit(isEdit: boolean) {
    if (isEdit) this.form.enable();
    else this.form.disable();
  }

  _btnSave() {
    if (confirm('確定儲存？')) {
      this.sending = true;
      // backend -> save member
      // 畫面資料要刷新
      alert('已儲存');
      this._btnEdit(false);
      this.sending = false;
    }
  }

  _btnClose() {
    // liff.closeWindow();
    // this.liffService.liff.closeWindow();
  }

  get roleList() { return Object.values(Role); }
  get genderList() { return Object.values(Gender); }

}
