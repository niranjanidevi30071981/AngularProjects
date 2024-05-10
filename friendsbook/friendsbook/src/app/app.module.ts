import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import {ResetPasswordComponent} from './resetpassword/resetpassword.component'
import { HomeComponent } from './post/home/home.component';
import { NetworkpageComponent } from './post/networkpage/networkpage.component';
import { FriendsListpageComponent } from './friends-listpage/friends-listpage.component';
import { UserslistComponent } from './admin/userslist/userslist.component';
import { UserheaderComponent } from './header/userheader/userheader.component';
import { RegistrationService } from './registration/registration.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from  './login/login.service';
import { ResetPasswrodSevice } from './resetpassword/resetpassword.service';
import {ForgotPasswordService} from './forgotpassword/forgotpassword.service';
import { FriendsheaderComponent } from './header/friendsheader/friendsheader.component';
import { FriendslistComponent } from './post/friendslist/friendslist.component';
import { ProfilesettingComponent } from './settings/profilesetting/profilesetting.component';
import { UserlistComponent } from './userlist/userlist.component'
import { HomeService } from './post/home/home.service';
import { NetworkService } from './post/networkpage/networkpage.service';
import { ProfileSettingService } from './settings/profilesetting/profilesetting.service';
import { ChangePasswordService } from './settings/changepassword/changepassword.service';
import { SettingsComponent } from './settings/settings.component';
import { ChangepasswordComponent } from './settings/changepassword/changepassword.component';
import { UserListService } from './userlist/userlist.service';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ForgotpasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    NetworkpageComponent,
    FriendsListpageComponent,   
    UserslistComponent,
    UserheaderComponent,
    FriendsheaderComponent,    
    FriendslistComponent,
    ProfilesettingComponent,
    UserlistComponent,
    SettingsComponent  ,
    ChangepasswordComponent,
    HeaderComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    FormsModule,
    HttpClientModule
  ],
  providers: [RegistrationService,LoginService,
    ResetPasswrodSevice,ForgotPasswordService,
    HomeService,NetworkService,ProfileSettingService,
    ChangePasswordService,UserListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
