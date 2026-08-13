import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Observable } from 'rxjs';
import { PlayerHistoryDuels } from '../interfaces/player-history-duel.interface';

@Injectable({ providedIn: 'root' })
export class RecordService {

    // private
    private http = inject(HttpClient);

    playerHistoryDuels(): Observable<PlayerHistoryDuels[]> {
        return this.http.get<PlayerHistoryDuels[]>(`${environment.baseURL}/statistics/player-history-duels`,
            { withCredentials: true }
        );
    }

}