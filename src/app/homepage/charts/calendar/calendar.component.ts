import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Component, inject, OnInit } from '@angular/core';
import { DailyAttendanceService } from 'src/app/services/DailyAttendanceLogs.service';
import { Employee } from 'src/app/model/employee';
import { CalanderLogs, EventData } from 'src/app/model/CalendarLogs';
import { map } from 'rxjs/operators';
import { AttendaceLogs } from 'src/app/model/DailyAttendanceLogs';

@Component({
  selector: 'app-calander',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalanderComponent implements OnInit {

  calanderService = inject(DailyAttendanceService);
  
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }

 
  calData:any;
  eventDate:Date[]=[];
  eventTime:String[]=[];
  wholeEventObject:EventData[]=[];
  locations:any;
  ngOnInit(): void {
    console.log(this.calanderService.getCalData())

  var arrs = this.calanderService.getCalData();
  this.locations = arrs.map(([lat, lng]) => ({lat, lng}));
  console.log(this.locations);
  }

  convertions(){
    var arrs = this.calanderService.getCalData();
  this.locations = arrs.map(([lat, lng]) => ({lat, lng}));
  console.log(this.locations);
  }



  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: (arg) => this.handleDateClick(arg),
    events: this.calanderService.getCalData()
  };
   
  

  
}
