import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friendsheader',
  templateUrl: './friendsheader.component.html',
  styleUrls: ['./friendsheader.component.css']
})
export class FriendsheaderComponent implements OnInit{
  selectedTab: number = 1;
  roletype:string|null='';


  constructor(
        private router: Router
  ){}  

  ngOnInit(): void {   
    
    this.roletype=localStorage.getItem('roleType');
    //console.log('niru'+this.roletype);
  }

  selectTab(tabNumber: number) {
    this.selectedTab = tabNumber;
  }

  logoutUser():void{
    localStorage.removeItem('Token_Number');
    localStorage.removeItem('Role_Type');
    localStorage.removeItem('firstname');

    localStorage.removeItem('imageName');
    localStorage.removeItem('ConnectionsCount');
    localStorage.removeItem('roleType');    
    this.router.navigate(['/login'])

  }
}
