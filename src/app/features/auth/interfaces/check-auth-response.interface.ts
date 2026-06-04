import { User } from "./user.interface";

export interface CheckAuthResponse {
    ok: boolean;
    user: User;
}