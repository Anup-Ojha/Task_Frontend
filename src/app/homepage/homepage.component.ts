import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
const PROFILE_ICON = `
<svg width="24" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="12" fill="#17a2b8"/>  <path d="M12 14c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0 2c2.9 0 5.4 1.1 7 2.9-.7 1.6-2.5 2.1-4.5 2.1H9.5c-2 0-3.8-.5-4.5-2.1C6.6 17.1 9.1 16 12 16zm4.1-8.17L14 8l-2.1 2.1L9.5 9.5l-1.4 1.4L12 13.4l5.5-5.5z" fill="white"/>
</svg>
`;

const ORGA=`<svg fill="#000000" width="24" height="24" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>group-solid</title>
    <path class="clr-i-solid clr-i-solid-path-1" d="M12,16.14q-.43,0-.87,0a8.67,8.67,0,0,0-6.43,2.52l-.24.28v8.28H8.54v-4.7l.55-.62.25-.29a11,11,0,0,1,4.71-2.86A6.59,6.59,0,0,1,12,16.14Z"></path><path class="clr-i-solid clr-i-solid-path-2" d="M31.34,18.63a8.67,8.67,0,0,0-6.43-2.52,10.47,10.47,0,0,0-1.09.06,6.59,6.59,0,0,1-2,2.45,10.91,10.91,0,0,1,5,3l.25.28.54.62v4.71h3.94V18.91Z"></path><path class="clr-i-solid clr-i-solid-path-3" d="M11.1,14.19c.11,0,.2,0,.31,0a6.45,6.45,0,0,1,3.11-6.29,4.09,4.09,0,1,0-3.42,6.33Z"></path><path class="clr-i-solid clr-i-solid-path-4" d="M24.43,13.44a6.54,6.54,0,0,1,0,.69,4.09,4.09,0,0,0,.58.05h.19A4.09,4.09,0,1,0,21.47,8,6.53,6.53,0,0,1,24.43,13.44Z"></path><circle class="clr-i-solid clr-i-solid-path-5" cx="17.87" cy="13.45" r="4.47"></circle><path class="clr-i-solid clr-i-solid-path-6" d="M18.11,20.3A9.69,9.69,0,0,0,11,23l-.25.28v6.33a1.57,1.57,0,0,0,1.6,1.54H23.84a1.57,1.57,0,0,0,1.6-1.54V23.3L25.2,23A9.58,9.58,0,0,0,18.11,20.3Z"></path>
    <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
</svg>`

const LEAVE_LOGS=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="12" fill="#007bff"/>  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 
  2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-5.5-9h11v1h-11v-1zM12 7v5.1l2.8 1.7L15 15l-5-3-5 3 2.2-1.7z" fill="white"/>
</svg>`;

const ATTENDANCE_ICON = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h10v2H7v-2zm0 4h10v2H7v-2z" fill="currentColor"/>
</svg>
`;


const LOGOUT_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 13h-5V8h5m0-2h-5C9.9 6 9 6.9 9 8v5c0 1.1.9 2 2 2h5c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM7 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="currentColor"/>
</svg>
`;



@Component({
  selector: 'app-sidebar',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  toggleDrawer(): void {
    this.drawerOpened = !this.drawerOpened;
  }

  on=true;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private router:Router) {
    iconRegistry.addSvgIconLiteral('profile', sanitizer.bypassSecurityTrustHtml(PROFILE_ICON));
    iconRegistry.addSvgIconLiteral('group', sanitizer.bypassSecurityTrustHtml(LEAVE_LOGS));
    iconRegistry.addSvgIconLiteral('logout', sanitizer.bypassSecurityTrustHtml(LOGOUT_ICON));
    iconRegistry.addSvgIconLiteral('attendance', sanitizer.bypassSecurityTrustHtml(ATTENDANCE_ICON));
    iconRegistry.addSvgIconLiteral('organisation',sanitizer.bypassSecurityTrustHtml(ORGA));


    // console.log(localStorage.getItem('token')); // ✅ Get token from localStorage

  }
    drawerOpened = true; // Initially open

  
    navigateToProfile() {
      this.router.navigate(['home/profile']);
      this.on=false;
    }
  
    navigateToGroup() {
      this.router.navigate(['home/group']);
      this.on=false;

    }
  
    navigateToSettings() {
      this.router.navigate(['logout']);
      this.on=false;

    }

    navigateToMenu(){
      this.router.navigate(["home"]);
      this.on=true;
    }

    navigateToOrganinzation(){
      this.router.navigate(['home/organization']);
      this.on=false;
    }
  }
  
