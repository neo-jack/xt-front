// 头像信息接口
export interface HeadshotInfo {
    name: string;
    url: string;
    id: number;
}

// 可用的头像列表数据
export const mockHeadshots: HeadshotInfo[] = [
    {
        id: 1,
        name: '02.png',
        url: '/datebash/acators/02.png'  // 当前用户头像，会被前端过滤掉
    },
    {
        id: 2,
        name: '03.png', 
        url: '/datebash/acators/03.png'
    },
    {
        id: 3,
        name: '01.png',
        url: '/datebash/acators/01.png'
    },
    {
        id: 4,
        name: '04.png',
        url: '/datebash/acators/04.png'
    }
];
