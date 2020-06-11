import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataPointModel} from './data-point/data-point.model';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit, OnChanges {

  public startDate: any = {year: new Date().getFullYear(), month: new Date().getMonth() + 1};

  public minDate: any;

  public maxDate: any;

  public dateSelected: Date;

  public informationArray: DataPointModel[] = [];

  private monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  private tempValueArray: number[] = [];

  private getUrl = 'http://localhost:8080/points';

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getDatesFromServer();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getDatesFromServer();
  }

  getDatesFromServer() {
    this.http
      .get(this.getUrl + '/dates')
      .subscribe(
        get => {
          const minDateDB = new Date(get[0]);
          const maxDateDB = new Date(get[1]);
          this.minDate = {year: minDateDB.getFullYear(), month: minDateDB.getMonth() + 1, day: minDateDB.getDate()};
          this.maxDate = {year: maxDateDB.getFullYear(), month: maxDateDB.getMonth() + 1, day: maxDateDB.getDate()};
        });
  }

  onDateSelect(date: any) {
    this.dateSelected = new Date(date.year, date.month - 1, date.day);
    this.getByDate(date);
    this.getDatesFromServer();
  }

  getByDate(date: any) {
    this.informationArray = [];
    this.http
      .get(this.getUrl, {
        params: {
          selectedYear: date.year.toString(),
          selectedMonth: date.month.toString(),
          selectedDay: date.day.toString()
        }
      })
      .subscribe(
        get => {
          this.addToInformationArray(get);
        });
  }

  addToInformationArray(array: any) {
    array.forEach(data => {
      this.informationArray.push(Object.assign(new DataPointModel(), data));
    });
    this.tempValueArray = [];
    this.informationArray.forEach(data => {
      this.tempValueArray.push(data.tempValue);
    });
  }

  getAverage() {
    let average = 0;
    this.informationArray.forEach(data => {
      average += data.tempValue;
    });
    average /= this.informationArray.length;
    return average.toFixed(1);
  }

  getMax() {
    return Math.max(...this.tempValueArray);

  }

  getMin() {
    return Math.min(...this.tempValueArray);
  }

  getNiceDateString() {
    return this.dateSelected.getFullYear() + ' ' +
      this.monthNames[this.dateSelected.getMonth()] + ' ' +
      this.dateSelected.getDate();
  }


}
