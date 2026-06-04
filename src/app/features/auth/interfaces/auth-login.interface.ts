import { User } from "./user.interface";

export interface LoginResponse {
    ok: boolean;
    msg: string;
    user: User;
}
