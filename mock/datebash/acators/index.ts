// 头像信息接口
export interface HeadshotInfo {
    name: string;
    url: string;
    id: number;
    userId: number;
}

// 可用的头像列表数据
export const mockHeadshots: HeadshotInfo[] = [
    {
        id: 1,
        name: "user_1_1755300000000_avatar1.png",
        url: "/datebash/acators/user_1_1755300000000_avatar1.png",
        userId: 1
    },
    {
        id: 2,
        name: "user_1_1755300000001_avatar2.png",
        url: "/datebash/acators/user_1_1755300000001_avatar2.png",
        userId: 1
    },
    {
        id: 3,
        name: "user_1_1755300000002_avatar3.png",
        url: "/datebash/acators/user_1_1755300000002_avatar3.png",
        userId: 1
    },
    {
        id: 4,
        name: "user_1_1755300000003_avatar4.png",
        url: "/datebash/acators/user_1_1755300000003_avatar4.png",
        userId: 1
    },
    {
        id: 5,
        name: "user_1_1755300000000_avatar5.jpg",
        url: "/datebash/acators/user_1_1755300000000_avatar5.jpg",
        userId: 1
    },
    {
        id: 6,
        name: "user_1_1755300000000_avatar6.jpg",
        url: "/datebash/acators/user_1_1755300000000_avatar6.jpg",
        userId: 1
    }
];
