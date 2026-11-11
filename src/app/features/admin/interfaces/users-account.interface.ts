import { TypeName } from "./user-type-name.interface";

export interface UserAccount {
    id: string;
    email: string;
    name: string;
    lastName: string;
    isActive: boolean;
    typeUser: TypeName;
}