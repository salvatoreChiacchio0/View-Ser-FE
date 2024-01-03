import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewSerService } from '../../service/view-ser.service';
import { IVerifySchedule } from '../../models/verifySchedule.model';
import { CommonModule } from '@angular/common';
import { SolutionComponent } from '../solution/solution.component';
import { ITestSchedule } from '../../models/testSchedule.model';

@Component({
  selector: 'app-test-ability',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,SolutionComponent],
  templateUrl: './test-ability.component.html',
  styleUrl: './test-ability.component.scss'
})
export class TestAbilityComponent implements OnInit{
  @ViewChild('dice', { read: ElementRef, static:false }) 'dice':ElementRef;

  userGuess:boolean = false
  randomSchedule:string = 'Click  the dice icon to get a random schedule'
  selection:boolean = false
  result:string = ''
  randomScheduleResult!:ITestSchedule
  solutionFlag:boolean = false

  constructor(private viewSerService:ViewSerService,private el: ElementRef){}

  radioFormGroup!:FormGroup
  ngOnInit(): void {
      this.radioFormGroup = this.initFormGroup()
  } 
  initFormGroup():FormGroup{
    return new FormGroup({
      guess:new FormControl(false)
    })
  }

  getRandomSchedule(){
    this.result = ''
    this.solutionFlag = false
    this.dice.nativeElement.classList.add('roll');
    this.viewSerService.randomSchedule().subscribe({
      next:(schedule:any)=>{
        this.randomSchedule = schedule.result
      }
    })
    setTimeout(()=>{
      this.dice.nativeElement.classList.remove('roll');
    },2000)
  }
  verifySchedule(){
    let objToSend : IVerifySchedule = {
      schedule : this.randomSchedule,
      result: this.radioFormGroup.value.guess
    }
      if(objToSend.schedule != 'Click  the dice icon to get a random schedule') 
        this.viewSerService.verifySchedule(objToSend).subscribe({
          next:(response:any)=>{
            console.log(response);
            this.result = response.result
            
          }
        })
  }
  randomScheduleRetrieved(){
    this.solutionFlag = false
    return this.randomSchedule != 'Click  the dice icon to get a random schedule' && this.randomSchedule != 'You completed all the schedule!🥳'
  }
  async scheduleSolution(){
   await this.viewSerService.testSchedule(this.randomSchedule).subscribe({
      next:(response:ITestSchedule)=>{
        this.randomScheduleResult = response
      }
    })
    this.solutionFlag = true
    console.log(this.solutionFlag);
    
  }

  getSolutionFlag(){
    console.log(this.solutionFlag);
    return this.solutionFlag
  }
}
