import { User } from "../../auth/interfaces/user.interface";

export interface UserStandardResponse {
    ok: boolean;
    message: string;
    user: User;
}