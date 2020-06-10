export class DataPointModel {
  id: number;

  lon: number;

  lat: number;

  tempValue: number;

  tempUnits: string;

  observationTimeValue: Date;

  constructor() {
  }

  getDateTime() {
    const date = new Date(this.observationTimeValue);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  getTime() {
    const date = new Date(this.observationTimeValue);
    return date.getHours() + ':' + date.getMinutes();
  }

}
