import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { PlayerOption } from "../interfaces/game-profile.interface";

@Injectable({ providedIn: 'root' })
export class GameProfileService {

    // private
    private http = inject(HttpClient);

    playersNickName() {
        return this.http.get<PlayerOption[]>(`${environment.baseURL}/game-profile/profile/players-nickname`,
            { withCredentials: true }
        );
    }

}