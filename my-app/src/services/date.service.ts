import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public getDateFormate(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  public getDateFromFormat(date: string): Date{
    //YEAR-MONTH-DAY
    const DATE_PARTS = date.split('-')
    const Y = parseInt(DATE_PARTS[0])
    const M = parseInt(DATE_PARTS[1]) - 1 // Month is zero-based (0-11)
    const D = parseInt(DATE_PARTS[2])
    return new Date(Y, M, D) as Date
  } 

}
