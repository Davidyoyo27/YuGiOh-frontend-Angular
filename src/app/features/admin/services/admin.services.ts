import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { UserAccount } from "../interfaces/users-account.interface";

@Injectable({ providedIn: 'root' })
export class AdminService {

    // privates
    private http = inject(HttpClient);

    usersDuelists() {
        return this.http.get<UserAccount[]>(`${environment.baseURL}/admin/administrator/all-users`,
            { withCredentials: true }
        );
    }

}