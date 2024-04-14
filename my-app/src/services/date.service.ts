import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public getDateFormat(date: Date): string {
    const year: number = date.getFullYear()
    const month: string = String(date.getMonth() + 1).padStart(2, '0')
    const day: string = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  public getDateFromFormat(date: string): Date{
    //YEAR-MONTH-DAY
    const DATE_PARTS: string[] = date.split('-')
    const Y: number = parseInt(DATE_PARTS[0])
    const M: number = parseInt(DATE_PARTS[1]) - 1 // Month is zero-based (0-11)
    const D: number = parseInt(DATE_PARTS[2])
    return new Date(Y, M, D) as Date
  }

}
