import { User } from "./user.interface";

export interface LoginResponse {
    ok: boolean;
    message: string;
    user: User;
}
