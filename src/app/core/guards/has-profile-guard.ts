import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../../features/auth/store/auth.store';

// si el usuario ya tiene un perfil de jugador e intenta ingresar 
// a crear un perfil es redireccionado inmediatamente
export const hasProfileGuard: CanActivateFn = (route, state) => {

  const authStore = inject(AuthStore);
  const router = inject(Router);

  if(authStore.user()?.profileId){
    return router.createUrlTree(['/player-perfil']);
  }

  return true;
};
