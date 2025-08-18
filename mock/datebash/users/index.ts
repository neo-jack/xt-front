// 用户数据定义
export interface MockUser {
  USER_ID: number;
  USER_NAME: string;
  USER_AVATAR: string;
  USER_ROLE: string;
  HOSPITAL_CNAME: string;
  HOSPITAL_ID: number;
  username: string;
  password: string;
}

// 模拟用户数据
export const mockUsers: MockUser[] = [
  {
    USER_ID: 1,
    USER_NAME: '李银',
    USER_AVATAR: '/datebash/acators/user_1_1755300000000_avatar1.png', // 指向实际存在的文件
    USER_ROLE: 'root',
    HOSPITAL_CNAME: 'xxx省医院',
    HOSPITAL_ID: 1,
    username: 'root',
    password: '63a9f0ea7bb98050796b649e85481845',
  },
  {
    USER_ID: 2,
    USER_NAME: '张医生',
    USER_AVATAR: '/datebash/acators/user_1_1755300000001_avatar2.png', // 指向实际存在的文件
    USER_ROLE: 'doctor',
    HOSPITAL_CNAME: 'xxx省医院',
    HOSPITAL_ID: 1,
    username: 'doctor',
    password: 'e10adc3949ba59abbe56e057f20f883e', // MD5: 123456
  },
];
