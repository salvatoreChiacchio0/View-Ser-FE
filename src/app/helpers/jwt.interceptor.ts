/*import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
 import { AuthService } from "../service/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(this.authService.userSubject);
        
        if (this.authService.isAuthenticated.value) {
            let user = this.authService.userSubject.value
            
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${user?.accessToken}` }
            });
            return next.handle(request);
        }
        return next.handle(request);
    }
}*/

import { HttpInterceptorFn } from "@angular/common/http";

export const JwtInterceptor:HttpInterceptorFn = (req,next)=>{
    const authHeader = req.clone({
        headers: req.headers.set('Authorization','Bearer '+ localStorage.getItem('token'))
    })
    return next(authHeader)
}