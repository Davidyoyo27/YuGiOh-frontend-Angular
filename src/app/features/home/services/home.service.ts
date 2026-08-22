import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { PlayerStatistics } from "../interfaces/player-statistics.interface";
import { LastDuels } from "../interfaces/player-lasts-duels.interface";
import { Observable } from "rxjs";
import { PlayerVsStatistics } from "../interfaces/player-vs-statistics.interface";

@Injectable({ providedIn: 'root' })
export class HomeService {

    // private
    private http = inject(HttpClient);

    playerStatistics() {
        return this.http.get<PlayerStatistics>(`${environment.baseURL}/statistics/player-statistics`,
            { withCredentials: true }
        );
    }

    playerLastsDuels(): Observable<LastDuels[]> {
        return this.http.get<LastDuels[]>(`${environment.baseURL}/statistics/user-lasts-duels`,
            { withCredentials: true }
        );
    }

    playerVsPlayerStatistics(id: number) {
        return this.http.get<PlayerVsStatistics>(`${environment.baseURL}/statistics/playerVSplayer-statistics/${id}`,
            { withCredentials: true }
        );
    }

}