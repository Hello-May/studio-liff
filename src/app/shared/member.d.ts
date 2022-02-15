declare enum Gender {
  male = '男',
  female = '女'
}

declare enum Role {
  visitor = '訪客',
  trainee = '學員',
  freelancer = '進駐者',
  manager = '管理者',
  other = '其他'
}

declare interface LineUser {
  userId: string,
  displayName: string,
  pictureUrl?: string,
  statusMessage?: string
  phone?: string;
  email?: string;
}

declare interface Member {
  uid: LineUser['userId'],
  displayName: string,
  pictureUrl: string,
  statusMessage?: string,
  role: Role;
  gender: Gender;
  birth?: Date;
  phone?: string;
  email?: string;
  aboutMe?: string;
  createdAt: Date;
  updatedAt: Date;
}
