import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStore } from "../../features/auth/store/auth.store";

// si existe la sesion se puede seguir navegando, si no, mandara al login
export const authGuard: CanActivateFn = () => {

    const authStore = inject(AuthStore);
    const router = inject(Router);

    if (authStore.isAuthenticated()) {
        return true;
    }

    return router.createUrlTree(['/login']);
}