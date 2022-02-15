// 本地開發
// localStorage.setItem('dev-liff-config', JSON.stringify({
//   "userId": "Ue7239b947f52a9648e608c54a51ab631",
//   "displayName": "May",
//   "pictureUrl": "https://storage.googleapis.com/aiii-bot-platform-tw/system/nopic.jpg"
// }))

export const dev = {
  uid: 'Ue7239b947f52a9648e608c54a51ab631',
  displayName: 'May',
  pictureUrl: "https://storage.googleapis.com/aiii-bot-platform-tw/system/nopic.jpg"
}

export enum LineInfo {
  // botId = 'Ue60b538ba138409bb366f53029f666c5'
}

export enum LiffId {
  member = '1656668233-b9v8BE84',
  news_list = '1656668233-3prlWRlx',
  news_page = '1656668233-EV6e7vex',
  // product = '1655701927-2lQLq4R3'
}

export enum Api {
  // pushMsg = 'https://cheng-3m-line-dialogflow-dnz3lqp74q-de.a.run.app/push-msg'
  backend_dev = 'https://test.may.services/api',
}
