import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { AuthService } from '../service/auth.service';
import { Path } from '../enum/path';

/**
 * It's used for security purposes. It checks if the current user is authorized to navigate
 * to a specific route, based on authentication and role check.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   * @param router A service that provides navigation among views and URL manipulation capabilities
   * @param authenticationService Refer to {@link AuthenticationService}
   */
  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    let isAuthenticated = this.authenticationService.isAuthenticated.value;
    if (isAuthenticated) {
      return true;
    } else {      
      if (localStorage.getItem('token')) {
        this.authenticationService.getMe().subscribe({
          next: (user) => {
            this.authenticationService.userSubject.next(user);
            this.authenticationService.isAuthenticated.next(true);
            this.router.navigate([Path.PLAYGROUND]);

            return true
          },
          error:((err)=>{return false})
        });
      }
      this.router.navigate([Path.LOGIN]);
      return false;
    }
  }
}
