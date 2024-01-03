import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { Path } from '../enum/path';
import { Router } from '@angular/router';
import { RegisterModalComponent } from './register-modal/register-modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RegisterModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
    loginFormgroup!:FormGroup 
    errorMessage:string = ''
  constructor(private auth:AuthService,private router:Router, 
    ){}

  ngOnInit(): void {
    this.loginFormgroup = this.initForm()
   }

   initForm(){
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,Validators.minLength(8)
      ]),
    });;
   }
 

  submitLogin() {
    
    this.auth.login(this.loginFormgroup.value)
    .then((flag:any)=>{
      if(flag) this.router.navigate([Path.PLAYGROUND])      
      this.errorMessage = flag ? '':'Bad credentials' 
    })
    // .then((result)=> result?this.router.navigate([Path.PLAYGROUND]):this.router.navigate([Path.HOME]))
  }
  register(){
       let myDialog:any = <any>document.getElementById("my-dialog");
      myDialog.showModal();
   }


   onCloseDialog(){    
    let myDialog:any = <any>document.getElementById("my-dialog");
    myDialog.close()
   }
}
