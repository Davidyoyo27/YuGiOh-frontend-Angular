import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { UserStandardResponse } from "../interfaces/user-standar-response";

@Injectable({ providedIn: 'root' })
export class ProfileService {

    // private
    private http = inject(HttpClient);

    uploadAvatarPlayerProfile(file: File) {
        const formData = new FormData();
        formData.append('avatar', file);

        return this.http.post<UserStandardResponse>(`${environment.baseURL}/game-profile/profile/upload-avatar`,
            formData,
            { withCredentials: true }
        );
    }

    updateUserAccount(data: { name?: string, lastName?: string }) {
        return this.http.patch<UserStandardResponse>(`${environment.baseURL}/user/update-user-account`,
            data,
            { withCredentials: true }
        );
    }

    updateUserProfile(nickName: string) {
        return this.http.patch<UserStandardResponse>(`${environment.baseURL}/game-profile/profile/update-profile`,
            { nickName },
            { withCredentials: true }
        );
    }

    createGameProfile(nickName: string) {
        return this.http.post<UserStandardResponse>(`${environment.baseURL}/game-profile/profile/create-profile`,
            { nickName },
            { withCredentials: true }
        );
    }

}