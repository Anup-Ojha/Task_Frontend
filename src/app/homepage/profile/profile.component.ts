import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { LoginService } from 'src/app/services/loginhttp.service';
import { Chart, registerables } from 'chart.js';
import { LeaveService } from 'src/app/services/leaves.service';
import { LeaveCount } from 'src/app/model/LeaveDetailsCount';
import { MonthCount, WeekCount } from 'src/app/model/CalendarLogs';
import { NgForm } from '@angular/forms';
Chart.register(...registerables);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  employeeString: string = localStorage.getItem('employee'); 
  employee: Employee; 
  chart: any;
  currDate=new Date;
  joiningDate=new Date;
  radarCharts:any;
  myStaticLeavesType: string[] = [];
  dataForChart:LeaveCount[]=[];
  myLeaveCount: number[] = [];
  userTakenLeaves:Number[]=[];
  userTakenLeavesType:String[]=[];
  weeksLabelName:String[]=[];
  weeksCountValues:Number[]=[];
  weeksObjectData:WeekCount[]=[];

  yearLabelName:String[]=[];
  yearCountValues:Number[]=[];
  yearWholeData:MonthCount[]=[];
  currentYear:Number[]=[];
  selected:String='2025';
  yearChart:Boolean=false;

  
  constructor(private service: LoginService, private staticLeavesDataService: LeaveService) {}

  ngOnInit() { 
    const employee: Employee = JSON.parse(this.employeeString);
    this.employee = employee; 
    this.joiningDate=this.employee.hireDate;
    // this.currentYear = this.currDate.getFullYear();
    this.getDatesArray();
    this.staticLeavesDataService.getAllStaticLeaves().subscribe((data) => {
      this.myStaticLeavesType = data.map(leave => leave.leaveType);
      this.myLeaveCount = data.map(leave => leave.numberOfLeaves); 

      this.staticLeavesDataService.getAllUserLeaveCount(this.employee.employeeId).subscribe((data:LeaveCount[])=>{
        this.dataForChart=data;
        if(this.dataForChart!=null){
          for(let i=0;i<this.dataForChart.length;i++){
            // console.log(this.dataForChart[i]);
            this.userTakenLeavesType.push(this.dataForChart[i].type);
            this.userTakenLeaves.push(this.dataForChart[i].COUNT);
          }
          this.userTakenLeavesType.sort();
        }
      })

      this.staticLeavesDataService.getAllWeeksCount(this.employee.employeeId).subscribe((data)=>{
        this.weeksObjectData=data;
        if(this.weeksObjectData!=null){
          for(let i=0;i<this.weeksObjectData.length;i++){
            this.weeksCountValues.push(this.weeksObjectData[i].count);
            this.weeksLabelName.push(this.weeksObjectData[i].day);
          }
          this.userTakenLeavesType.sort();
        }
      })


      // this.polarArea('polarArea','polarArea',['Late','Half Day','Full Day'],[8,10,18])
      setTimeout(()=>{
        this.barChart('bar','bar',this.weeksLabelName,this.weeksCountValues,'Total Leaves Taken in Weeks in year');
        this.radarChart('radar','radar',this.myStaticLeavesType,this.myLeaveCount,this.userTakenLeaves);
        this.pieChart('doughnut', 'pieChart', this.userTakenLeavesType, this.userTakenLeaves);
      // this.lineChart('bar','bar',this.weeksLabelName,this.weeksCountValues);
      },1000)  
    });    

    this.filterDataByWholeYear(this.selected);
  }


  filterDataByWholeYear(selected){
    let startDate=selected+"-01-01";
    let endDate=selected+"-12-31";
    this.staticLeavesDataService.getFilterYearData(startDate,endDate,this.employee.employeeId).subscribe((data)=>{
        this.yearWholeData=data;
        this.yearCountValues=[]
        this.yearLabelName=[]
        if(this.yearWholeData!=null){
          for(let i=0;i<this.yearWholeData.length;i++){
            this.yearCountValues.push(this.yearWholeData[i].count);
            this.yearLabelName.push(this.yearWholeData[i].month);
          }
        }

        let chartStatus = Chart.getChart("barChart"); // <canvas> id
            if (chartStatus != undefined) {
               chartStatus.destroy();
          }
        this.yearChart=true;
        setTimeout(()=>{
          this.barChart('bar','barChart',this.yearLabelName,this.yearCountValues,'Total Leaves Taken in a Month In a Year');
        },1000)
      })
  }



  getDatesArray(){
    let start=this.joiningDate.toString();
    let main=parseInt(start);
    let end=this.currDate.getFullYear();
    Number(end);
    while(main!=end+1){
        this.currentYear.push(main);
        main=main+1;
    }
  }


  pieChart(chartType: any, canvasName: any, labelValue: String[], dataValue: Number[]) {
    const Cdata = {
      labels: labelValue,
      datasets: [{
        label: 'Total Leaves',
        data: dataValue,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)'
        ],
        hoverOffset: 100,
        borderDashOffset:0.5
      }]
    };

    const config: any = {
      type: chartType,
      data: Cdata,
    };
    this.chart = new Chart(canvasName, config);
  }


  // polarArea(chartType: any, canvasName: any, labelValue: string[], dataValue: number[]){
  //   const data = {
  //     labels: labelValue,
  //     datasets: [{
  //       label: 'My First Dataset',
  //       data: dataValue,
  //       backgroundColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(75, 192, 192)',
  //         'rgb(255, 205, 86)'
  //       ]
  //     }]
  //   };

  //   const config:any = {
  //     type: chartType,
  //     data: data    
  //   };
  //   this.chart= new Chart(canvasName,config);
  // }


radarChart(chartType: any, canvasName: any, labelValue?: string[], dataValue?: number[],userTakenLeaves?:Number[]){
const data = {
  labels: labelValue,
  datasets: [{
    label: 'Leaves Given By Company',
    data: dataValue,
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)'

  }, {
    label: 'Leaves Taken By Employee',
    data: userTakenLeaves,
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)'
  }]
};

  const config = {
    type: chartType,
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3
        }
      }
    }
  };

  this.chart=new Chart(canvasName,config);
  }


  barChart(chartType:any, canvasName: any, labelValue?: String[], dataValue?: Number[],datasetLabel?:String){
    // const labels = Utils.months({count: 5});
  const data = {
  labels: labelValue,
  datasets: [{
    label: datasetLabel,
    data: dataValue,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)'
    ],
    borderWidth: 1
  }]
};

  const config = {
    type: chartType,
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  this.chart=new Chart(canvasName,config);
  }

// lineChart(chartType:any, canvasName: any, labelValue?: String[], dataValue?: Number[],userTakenLeaves?:Number[]){

//   const data = {
//     labels: labelValue,
//     datasets: [{
//       label: "Leaves Taken on Weeks",
//       data: dataValue,
//       borderColor: 'rgb(75, 192, 192)',
//     }]
//   };

//   const config = {
//     type: chartType,
//     data: data,
//   };
//   this.chart=new Chart(canvasName,config);

// }


}
