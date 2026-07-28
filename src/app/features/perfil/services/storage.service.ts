import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { AvatarImage } from "../interfaces/avatar-image.interface";

@Injectable({ providedIn: 'root' })
export class StorageService {

    // private
    private http = inject(HttpClient);

    playerImageDefaultPerfil() {
        return this.http.get<AvatarImage>(`${environment.baseURL}/storage/default-avatars`,
            { withCredentials: true }
        );
    }

}