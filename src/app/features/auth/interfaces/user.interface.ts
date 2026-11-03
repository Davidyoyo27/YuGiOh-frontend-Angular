import { Role } from "./role.interface";

export interface User {
    id: string;
    userName: string;
    lastName: string | null;
    email: string;
    role: Role;
    profileId: number | null;
    nickName: string | null;
    createdAt: string | null;
    avatarUrl: string | null;
}
