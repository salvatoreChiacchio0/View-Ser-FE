import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Path } from '../../enum/path';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss'
})
export class RegisterModalComponent implements OnInit{
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();


  registerFormGroup!:FormGroup 
  errorMessage:string = ''
constructor(private auth:AuthService,private router:Router, 
  ){}

ngOnInit(): void {
  this.registerFormGroup = this.initForm()
 }

 initForm(){
  return new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,Validators.minLength(8)
    ]),
  });;
 }

  register(){
    this.auth.register(this.registerFormGroup.value).subscribe({
      next: ()=>{
        this.onCloseDialog()
      },
      error: (err:any)=>{
        this.errorMessage = 'Ops... An error occurred😭'
      }
    })
  }
  onCloseDialog() {
    this.closeDialog.emit();
  }
}
