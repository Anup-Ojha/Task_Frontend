import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { LeaveService } from 'src/app/services/leaves.service';
 
Chart.register(...registerables);

@Component({  
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent {
  show=true;

  onCalanderButtonClick(){
    this.show=!this.show;
  }

}
