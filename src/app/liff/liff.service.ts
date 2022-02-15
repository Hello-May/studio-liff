import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { environment } from 'src/environments/environment';
// import * as _ from 'lodash';
// import * as firebase from 'firebase';
// import * as moment from 'moment-timezone';

@Injectable()
export class LiffService {

  public isInit = false;
  public liff: LIFF = liff;
  public profile: LineUser = {
    userId: '',
    displayName: '',
    pictureUrl: '',
    statusMessage: ''
  };

  public initCount = 0;

  constructor(
    public http: HttpClient
  ) { }

  async initLiff(liffId: string) {
    ++this.initCount;
    let step = '01';
    try {
      if (!this.isInit && this.initCount < 2) {
        this.isInit = true;
        await this.liff.init({
          liffId
        });
      }

      step = '02';

      if (this.liff.isLoggedIn()) {
        step = '03';
        this.profile = await this.liff.getProfile();
        step = '04';
        const decodedIDToken = liff.getDecodedIDToken();
        if (decodedIDToken) {
          this.profile.email = decodedIDToken.email || '';
        }
      }

      step = '05';

      if (this.isDevMode()) {
        const devLiffConfig = localStorage.getItem('dev-liff-config');
        if (devLiffConfig) {
          this.profile = JSON.parse(localStorage.getItem('dev-liff-config') || '');
        }
      }

      step = '06';

    } catch (err) {
      console.error(err);
      let errorJSON = {};
      try {
        errorJSON = JSON.parse(JSON.stringify(err));
      } catch (err) {
        console.error(err);
      }
    }

  }

  /**
   * 判斷是否為本機開發模式
   */
  public isDevMode() {
    return window.location.host.includes('localhost:');
  }

  /**
   * 登入 LIFF 帳號
   * @param redirectUri 登入後跳轉的網址
   */
  public login(redirectUri = window.location.href) {
    localStorage.setItem('dev-liff-login', '1');
    if (!this.isDevMode()) {
      this.liff.login({
        redirectUri
      });
    }
  }

  // /**
  //  * 登出 LIFF 帳號
  //  */
  // public logout() {
  //   localStorage.setItem('dev-liff-login', '');
  //   this.liff.logout();
  // }

  /**
   * 判斷登入狀態
   */
  public isLoggedIn() {
    try {
      return this.isDevMode() && !!localStorage.getItem('dev-liff-login') || this.liff.isLoggedIn();
    } catch (err) {
      return false;
    }
  }


  // /**
  //  * 判斷環境 "ios" | "android" | "web"
  //  */
  // public getOS() {
  //   try {
  //     return this.liff.getOS();
  //   } catch (err) {
  //     return '';
  //   }
  // }

  // /**
  //  * 判斷是否為原生LIFF的環境
  //  */
  // public isInClient() {
  //   try {
  //     return this.liff.isInClient();
  //   } catch (err) {
  //     return false;
  //   }
  // }

  // /**
  //  * 查詢站台是否存在
  //  * @param site 站台名稱
  //  */
  // async querySiteExists(site: string): Promise<boolean> {
  //   const doc = await this.firestore.doc(`/sites/${site}`).ref.get();
  //   return doc.exists;
  // }

  // /**
  //  * 查詢該 site 站台的 botId 、Liff ID 及 公開資料
  //  * @param site 站台名稱
  //  */
  // async querySiteProfile(site: string): Promise<{
  //   site: string;
  //   botId: string;
  //   displayName: string;
  //   liff: LiffConfig;
  //   accountId: string;
  //   provider: string;
  // }> {

  //   const result: any = await this.http.post(
  //     `${environment.cloudrun.api}/querySiteConfig`,
  //     { site }).toPromise();

  //   return result;
  // }

  // /**
  //  * 若為手機則強制使用原生 LIFF 分享
  //  * @param messagea
  //  */
  // async forcedLiffShare(site: string, message: any[]) {
  //   try {

  //     if ((this.getOS() === 'android' || this.getOS() === 'ios')) { // 若使用手機
  //       if (this.isInClient()) { // 已是原生 LIFF 環境
  //         await liff.shareTargetPicker(message);
  //       } else { // 手機的 LINE 瀏覽器 或 外部瀏覽器
  //         const siteProfile = await this.querySiteProfile(site);
  //         const encodeText = encodeURIComponent(JSON.stringify(message));
  //         const httpReferer = encodeURIComponent(window.location.href);
  //         const shareLiffUrl = `https://liff.line.me/${siteProfile.liff.shareTargetPickerLiffID}?site=${site}&messageEncode=${encodeText}`;
  //         window.location.href = shareLiffUrl;
  //       }
  //     } else { // 桌機 直接使用 SDK 分享
  //       if (this.isLoggedIn()) {
  //         await liff.shareTargetPicker(message);
  //       } else {
  //         this.login();
  //       }
  //     }
  //   } catch (error: any) {
  //     alert(error.message)
  //   }
  // }

}
