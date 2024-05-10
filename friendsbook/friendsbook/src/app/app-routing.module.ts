import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import {ResetPasswordComponent} from './resetpassword/resetpassword.component'
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './post/home/home.component';
import { NetworkpageComponent } from './post/networkpage/networkpage.component';
import { FriendslistComponent } from './post/friendslist/friendslist.component';
import { UserlistComponent } from '../../src/app/userlist/userlist.component';
import { SettingsComponent } from './settings/settings.component';
import {UserGaurdService} from './gaurds/userGaurd.service';


const routes: Routes =  [ 
  {path:'users',component:UserlistComponent},//canActivate:[UserGaurdService]
  {path:'friendsList',component:FriendslistComponent},
  {path:'settings',component:SettingsComponent},
  {path:'network',component:NetworkpageComponent},
  {path:'home',component:HomeComponent},  
  {path:'forgotPassword',component:ForgotpasswordComponent},  
  {path:'resetPassword',component:ResetPasswordComponent},  
  {path:'login',component:LoginComponent},  
  {path:'register',component:RegistrationComponent},
  {path:'', component:RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [    
    UserGaurdService
  ]
})
export class AppRoutingModule { }
