import { CalendarOptions } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Component } from '@angular/core';

@Component({
  selector: 'app-calander',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalanderComponent {

  calendarOptions: CalendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, interactionPlugin],
      dateClick: (arg) => this.handleDateClick(arg),
      events: [
        { title: 'event 1', date: '2025-02-01' },
        { title: 'event 2', date: '2025-02-03' }
      ]
    };
  
    handleDateClick(arg) {
      alert('date click! ' + arg.dateStr)
    }

}
