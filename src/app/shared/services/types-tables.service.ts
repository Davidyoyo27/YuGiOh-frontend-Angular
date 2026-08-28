import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { TypeDuelOption } from "../../features/duel/interfaces/type-duel.interface";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TypesTablesService {

    // private
    private http = inject(HttpClient);

    typesDuels() {
        return this.http.get<TypeDuelOption[]>(`${environment.baseURL}/duel-game/types-duels`,
            { withCredentials: true }
        );
    }

}