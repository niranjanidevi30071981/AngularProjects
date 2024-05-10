import { Component } from '@angular/core';
import { IRegister } from './registration.model';
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  
  constructor(private registerService:RegistrationService,
    private router:Router){}

myUser = new IRegister('','','','','','05/10/2010','female','Admin','../../assets/images/chennai.png','','','','',false);
registerErrorMsg:String ='';


submitForm(Form:NgForm):void{
//console.log(Form.value);
this.registerService.registerUser(Form.value,this.myUser.firstname)
  .subscribe((res:any[]) => {console.log(res)})
   this.router.navigate(['/login'])
}

GotoLoginPage():void{
  this.router.navigate(['/login'])
}

}
