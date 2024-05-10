import {Injectable} from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable()

export class UserGaurdService implements CanActivate{
    token:string | null = '';
    role:string | null = '';

    constructor(private router:Router){}

    canActivate(): boolean{
        this.token = localStorage.getItem('Token_Number');
        this.role=localStorage.getItem('roleType');
       console.log(this.role);

        if(this.token == null ){
            this.router.navigate(['/login']);
            return false
        }

        if(this.token !== null && this.role==="User" ){
            return false
        }

        if(this.token !== null && this.role==="Admin" ){
            this.router.navigate(['/users']);
            return true
        }

        return false

    }
}