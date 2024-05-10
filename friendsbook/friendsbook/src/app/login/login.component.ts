import { Component } from '@angular/core';
import { ILogin, LoginRes,userRes } from './login.model'
import { Router } from '@angular/router';
import { LoginService } from  './login.service';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService:LoginService,
    private router:Router){}

myUserLogin = new ILogin('','');//default values
loginError:string='';

submitForm(Form:NgForm):void{
  console.log(Form.value)

  this.loginService.loginUser(Form.value)
      .subscribe((res:LoginRes) => {
          this.loginError = ''
          //console.log(res['token']);
          this.loginService.getUserInfo(res['token'],res['auth'],res['imageName'],res['role'])
          .subscribe((response:userRes) => {            
              this.validateUser(response['role'])
          })
      },(err:any[])=>{
          this.loginError = "Please Enter Valid Information"
      })
}

validateUser(roleType:string){

  localStorage.setItem('Role_Type',roleType);  
  console.log(roleType);
  this.router.navigate(['/home'])  
}

ForgotPassword():void{ 
  this.router.navigate(['/forgotPassword'])
}

}
