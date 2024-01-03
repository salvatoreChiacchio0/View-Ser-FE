import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ViewSerService } from '../service/view-ser.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { ITestSchedule } from '../models/testSchedule.model';
import { TestAbilityComponent } from './test-ability/test-ability.component';
import { SolutionComponent } from './solution/solution.component';

  
@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,TestAbilityComponent,SolutionComponent],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent implements OnInit{
  result!:ITestSchedule
  scheduleCheckForm!: FormGroup
  guidelinesFlag:boolean = false
  solutionFlag:boolean = false
  constructor(private router:Router,private viewSerializable:ViewSerService,private auth:AuthService){}
  
  ngOnInit(): void {
      this.scheduleCheckForm = this.initForm()
  }
  initForm():FormGroup{
    return  new FormGroup({
      schedule:new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  goToHomePage(){
    this.router.navigate([''])
  }
 
  checkViewSer(){   
    console.log(this.scheduleCheckForm.value);
     this.guidelinesFlag = false
     this.solutionFlag = false
      this.viewSerializable.testSchedule(this.scheduleCheckForm.value.schedule).subscribe(response=>{        
      this.result = response
    })
   
  }
  logout(){
    this.auth.logout()
  }

  

  //schedule r1(x)r1(y)w2(y)w3(x)w1(z)w2(z)w1(x)r3(z)w2(x)  // r1(X) w4(Z) w2(X) r2(Y ) w3(Y ) w3(X) r1(Y ) r4(Y ) w1(Z)
}
