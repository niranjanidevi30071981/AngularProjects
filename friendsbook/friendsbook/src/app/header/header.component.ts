import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
   
  })
  export class HeaderComponent implements OnInit{
    selectedHeader: number = 1;
    tokenNumber:string|null='';  
  
    constructor(
          private router: Router
    ){}  
  
    ngOnInit(): void {    
      
      this.tokenNumber=localStorage.getItem('firstname');
      //console.log(this.tokenNumber);
      if(this.tokenNumber !=null && this.tokenNumber !="undefined" )
      { this.selectedHeader=2;
     
      }
    }
  
  
  }
  