import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './homepage/profile/profile.component';
import { CalendarComponent } from './homepage/charts/calendar/calendar.component';


import { LoginService } from './services/loginhttp.service';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './homepage/group/group.component';
import { ChartsComponent } from './homepage/charts/charts.component';
import { LeaveService } from './services/leaves.service';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.service';
import { NgChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DailychartsComponent } from './homepage/charts/dailycharts/dailycharts.component';
import { DailyAttendanceService } from './services/DailyAttendanceLogs.service';
import { OrgainzationComponent } from './homepage/orgainzation/orgainzation.component';
import { AllEmployees } from './services/AllEmployees.service';
import { EditDialogComponent } from './homepage/group/edit-dialog/edit-dialog.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard], children: [
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'group', component: GroupComponent, canActivate: [AuthGuard] },
    { path: 'organization', component:OrgainzationComponent, canActivate:[AuthGuard]}
  ]}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    RegisterComponent,
    ProfileComponent,
    GroupComponent,
    ChartsComponent,
    LoginComponent,
    CalendarComponent,
    DailychartsComponent,
    OrgainzationComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // Set up routing here
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatStepperModule,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgChartsModule,
    FullCalendarModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatChipsModule,
    MatTooltipModule,
    MatAutocompleteModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatDialogModule
  ],
  providers: [LoginService,LeaveService,AllEmployees,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },DailyAttendanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }