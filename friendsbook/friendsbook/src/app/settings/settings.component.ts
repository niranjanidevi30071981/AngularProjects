import { Component } from '@angular/core';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent
 {  

selectedTab: number = 1;

  showTab(tabNumber: number) {
    this.selectedTab = tabNumber;
}

}