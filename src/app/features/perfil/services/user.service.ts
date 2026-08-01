import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { StandardResponse } from "../../auth/interfaces/standard-response.interface";

@Injectable({ providedIn: 'root' })
export class UserService {

    // private
    private http = inject(HttpClient);

    changeUserAccountPassword(currentPassword: string, password: string, passwordConfirm: string) {
        return this.http.patch<StandardResponse>(`${environment.baseURL}/user/change-password`,
            { currentPassword, password, passwordConfirm },
            { withCredentials: true }
        );
    }

}