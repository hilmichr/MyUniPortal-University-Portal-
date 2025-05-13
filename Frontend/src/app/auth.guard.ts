import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from './service/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.jwtService.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userRoles: Array<string> = payload.roles.split(',');
      const expectedRoles = next.data['roles'] as Array<string>;

      if (expectedRoles.some((role) => userRoles.includes(role))) {
        return true;
      }
    }

    this.router.navigate(['/login'], { queryParams: { unauthorized: true } });
    return false;
  }
}
