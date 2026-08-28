import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { StandardResponse } from "../../auth/interfaces/standard-response.interface";

@Injectable({ providedIn: 'root' })
export class DuelGameService {

    // privates
    private http = inject(HttpClient);

    createDuel(roomName: string, playersNumber: number, typeDuel: number){
        return this.http.post<StandardResponse>(`${environment.baseURL}/duel-game/create-duel`,
            { roomName, playersNumber, typeDuel },
            { withCredentials: true }
        );
    }

}