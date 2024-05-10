import { Component ,OnInit } from '@angular/core';
import { IHome ,FileResponseRes,postResponse} from './home.model';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { NgForm} from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { ILogin, LoginRes,userRes } from '../../login/login.model';
import {FriendsListRes} from '../networkpage/networkpage.model';


@Component({
  selector: 'app-home', 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{   
  
    token:string|null = '';
    auth:string|null ='';
    imageName:string|null='';
    role:string|null='';

    userInfo:userRes={
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
    };
  
    connectionsCount:number=0;
    postsCount:number=0;
    UploadingFile:string=''; 
    postFileName:string='';
    postFilePath:string=''; 
    uploadDate:string='';
    firstName:string=''; 



  //myUserPost = new IHome('','','','','','');
  FileResponse:FileResponseRes[]=[];
  posts:postResponse[]=[];  
  
  constructor(private homeService:HomeService,private loginService:LoginService,
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
   // this.userInfo = res
   //Get No of user posts information
  this.connectionsCount=0;
  this.postsCount=0;
  this.getFilesfromapi(this.auth?.toString()?this.auth:'' );

  this.homeService.getUserConnectionDeatils(this.auth?.toString()?this.auth:'')
  .subscribe((resResult:FriendsListRes[]) =>{
    localStorage.setItem('ConnectionsCount',resResult.length.toString());   
    this.connectionsCount= resResult.length;
  });      


  }),(err:any[])=>{            
            this.router.navigate(['/login']); 
        }
}

addHours(date:Date, hours:any):Date {
  const dateCopy = new Date(date.getTime());
  const hoursToAdd = hours * 60 * 60 * 1000;
  dateCopy.setTime(date.getTime() + hoursToAdd);
  return new Date(dateCopy);
}
calculateDateDiff(startDate: Date, endDate: Date): string {
  const diffInMs = endDate.getTime() - startDate.getTime();
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
  return `${days} days and ${hours} hours`;
}
getFilesfromapi(username?:string):void
{

  this.posts=[];
  this.homeService.getUserPostDeatils(username?username:'')
      .subscribe((data:any) => { 
       // console.log(data["files"].length);
        this.postsCount=data["files"].length;
        for(let filename1 of  data["files"])
        {
          //console.log(filename1);

          this.postFileName=filename1; 
          let datestring=filename1.split('_')[1];

          //Source date
          var dateSource = new Date(datestring.substr(0,10));
          var hoursSource=datestring.substr(11,2)
         //end date
          var currentDate=new Date().toISOString().substr(0,13)
          var dateDest = new Date(currentDate.substr(0,10));
          var hoursDest=currentDate.substr(11,2)
        
        
            this.postFilePath=`http://localhost:3000/post/images/${filename1}`;
            this.uploadDate=this.calculateDateDiff(this.addHours(dateSource,hoursSource),
            this.addHours(dateDest,hoursDest));   
            this.posts.push({filename:this.postFileName,filePath:this.postFilePath,datediff:this.uploadDate});
           
        }
                 
        })  

}
onFileSelected(event: any): void {
  const file: File = event.target.files[0];

//upload file
this.homeService.userPostDeatils(file,this.auth?this.auth:'')
.subscribe((res:any) => {

  console.log(this.auth);
  this.getFilesfromapi(this.auth?.toString()?this.auth:'' );

});


}
hidePost()
{

}
showPost()
{
  
}
AllUsersPosts()
{
  
}
submitForm(Form:NgForm):void{
  
}
 
}