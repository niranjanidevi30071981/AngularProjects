import { Component,OnInit } from '@angular/core';
import { IProfile } from './profilesetting.model';
import { Router } from '@angular/router';
import { NgForm} from '@angular/forms';
import { ProfileSettingService } from './profilesetting.service';
import { LoginService } from 'src/app/login/login.service';
import { userRes } from '../../login/login.model';

@Component({
  selector: 'app-profilesetting',
  templateUrl: './profilesetting.component.html',
  styleUrls: ['./profilesetting.component.css']
})
export class ProfilesettingComponent implements OnInit {

  token:string|null = '';
  auth:string|null ='';
  role:string|null='';
  imageName:string|null='';
  id:string='';

  myProfile = new IProfile('','','','','','','','','','','','','');
  registerErrorMsg:String ='';
userInfo:userRes[]=[{
    "_id":"",
    "firstname":"",
    "lastname":"",
    "email":"",
    "password":"",
    "DOB":"",
    "gender":"",
    "phoneno":"",
    "role":"",
    "image":"",
    "address":"",
		"city":"",
		"state":"",
		"country":"",
    "accountBlock":false,
    "createdAt":"",
    "updatedAt":"",     
    "__v":0
  }];

  constructor(private loginService:LoginService,private progfileSettinService:ProfileSettingService,
    private router:Router){}

    ngOnInit(): void {
      //token validation
      this.token = localStorage.getItem('Token_Number');
      this.auth = localStorage.getItem('firstname');      
      this.imageName = localStorage.getItem('imageName');

      this.role=localStorage.getItem('roleType');

      this.loginService.getUserInfo(this.token?this.token:'',this.auth?this.auth:'',
      this.imageName?this.imageName:'',this.role?this.role:'')
      .subscribe((res:userRes) => { 

        this.progfileSettinService.getregisterUser(this.auth?this.auth:'').subscribe((data:userRes[]) => { 
       //this.userInfo=data;
       this.id=data[0]._id;
       this.myProfile=data[0];
         });
      }),
      (err:any[])=>{            
      this.router.navigate(['/login']); 
  }
}  

  submitForm(Form:NgForm):void{
  //console.log(Form.value);
  this.progfileSettinService.updateUser(Form.value, this.id)
  .subscribe((res:any[]) => {
    this.registerErrorMsg="User details are updated successfully";
    console.log(res)}) 
  }

}
