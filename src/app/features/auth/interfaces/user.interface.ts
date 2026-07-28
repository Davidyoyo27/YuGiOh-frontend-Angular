
export interface User {
    id: string;
    userName: string;
    lastName: string | null;
    email: string;
    role: string;
    profileId: number | null;
    nickName: string | null;
    createdAt: string | null;
    avatarUrl: string | null;
}
