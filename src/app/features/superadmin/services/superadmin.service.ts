import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { UserAccount } from "../../admin/interfaces/users-account.interface";

@Injectable({ providedIn: 'root' })
export class SuperAdminService {

    // privates
    private http = inject(HttpClient);

    usersList() {
        return this.http.get<UserAccount[]>(`${environment.baseURL}/superadmin/superadministrator/all-users`,
            { withCredentials: true }
        );
    }

}