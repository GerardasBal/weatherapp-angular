import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataPointModel} from '../data-point/data-point.model';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnChanges {

  constructor() {
  }

  @Input() private informationArray: DataPointModel[] = [];

  public chartType = 'line';

  public chartDatasets: Array<any> = [
    {data: [], label: 'Temperature'},
  ];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, 0)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: '\u00B0 C',
          fontSize: 20
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        },
        scaleLabel: {
          display: true,
          labelString: 'Time',
          fontSize: 20
        }
      }]
    }
  };

  ngOnInit(): void {
    this.addData();

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.addData();
  }

  public addData() {
    this.chartDatasets[0].data = [];
    this.chartLabels = [];
    for (const dataPoint of this.informationArray) {
      this.chartDatasets[0].data.push(dataPoint.tempValue);
      this.chartLabels.push(dataPoint.getTime());
    }
  }

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

}
