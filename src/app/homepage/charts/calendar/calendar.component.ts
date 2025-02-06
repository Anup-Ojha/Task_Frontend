import { Calendar, CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Component, inject, OnInit } from '@angular/core';
import { DailyAttendanceService } from 'src/app/services/DailyAttendanceLogs.service';


@Component({
  selector: 'app-calander',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  calendarService = inject(DailyAttendanceService);
  calendarOptions: CalendarOptions;

  ngOnInit(): void {
    this.initializeCalendar(); 
  }

  initializeCalendar(): void {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, interactionPlugin],
        dateClick: this.handleDateClick.bind(this),
        events: this.calendarService.getCalData()
      };
  }

  handleDateClick(arg) {

    alert('Date clicked: ' + arg.dateStr);
  
  }
}
