import { Injectable } from "@angular/core"
import { AuthModel } from "../models/auth.model";
import { Path } from "../enum/path";
import { BehaviorSubject, firstValueFrom, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    
  userSubject: BehaviorSubject<AuthModel | undefined> = new BehaviorSubject<AuthModel | undefined>(undefined);
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor( private http: HttpClient, private router: Router) {

  }

  async login(user:any) {
    try{
      let userlogged = await firstValueFrom(this.http.post<AuthModel>(`http://localhost:3000/auth/login`, user)) 
      if(!userlogged) return false
      localStorage.setItem('token',userlogged.accessToken)
      this.userSubject.next(userlogged);
      this.isAuthenticated.next(true);
       
      return true
    }catch (e) {
      return false
    }
  
  }
 

   register(user:User){
    return this.http.post<User>(`http://localhost:3000/users`, user)
  }
  httpLoginRequest(user:any){
    return this.http.post<AuthModel>(`http://localhost:3000/auth/login`, user)
  }
   logout() {
    localStorage.removeItem('token')
     this.userSubject.next(undefined)
    this.isAuthenticated.next(false);
    this.router.navigate([Path.HOME])
  }

  getMe(){
    return this.http.get<AuthModel>(`http://localhost:3000/auth/me`)

  }
}