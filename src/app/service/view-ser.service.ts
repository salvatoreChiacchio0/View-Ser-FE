import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { ITestSchedule } from "../models/testSchedule.model";

const path = "/schedule/"
@Injectable({
    providedIn: 'root'
  })
export class ViewSerService {
    
  constructor( private http: HttpClient) {}

  testSchedule(schedule:string){
    return this.http.post<ITestSchedule>(`http://localhost:3000/schedule/test`,{schedule})
  }
  randomSchedule(){
    return this.http.get<any>(`http://localhost:3000/schedule/random`)
  }
  verifySchedule(schedule:ITestSchedule){
    return this.http.post<any>(`http://localhost:3000/schedule/verify`,schedule)
  }
}