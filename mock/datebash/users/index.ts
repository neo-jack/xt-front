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
    USER_AVATAR: '/datebash/acators/02.png', // 指向本地mock
    USER_ROLE: 'root',
    HOSPITAL_CNAME: 'xxx省医院',
    HOSPITAL_ID: 1,
    username: 'root',
    password: 'root',
  },
  {
    USER_ID: 2,
    USER_NAME: '张医生',
    USER_AVATAR: '/datebash/acators/03.png', // 指向本地mock
    USER_ROLE: 'doctor',
    HOSPITAL_CNAME: 'xxx省医院',
    HOSPITAL_ID: 1,
    username: 'doctor',
    password: '123456',
  },
];
