import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AppUrlService {
  private urlHistory: string[] = []
  private prevUrl: BehaviorSubject<string> = new BehaviorSubject<string>('')

  public setUrl(url: string) {
    const CHILD_ROUTES: number = url.split('/').length as number
    if (CHILD_ROUTES <= 2) {
      this.urlHistory = [] as string[]
    }
    this.urlHistory.push(url)
    this.prevUrl.next(this.urlHistory[this.urlHistory.length - 2])
  }

  public getCapturedURL(): Observable<string> {
    this.urlHistory.pop()
    this.urlHistory.pop()
    return this.prevUrl
  }

  constructor() {}
}
