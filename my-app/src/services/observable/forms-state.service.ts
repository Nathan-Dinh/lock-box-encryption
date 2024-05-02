import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsStateService {
  private changePassFrmDState: BehaviorSubject<string> = new BehaviorSubject<string>('none')

  setChangePassFrmDState(display: string){
    this.changePassFrmDState.next(display)
  }

  getChangePassFrmDState(): Observable<string>{
    return this .changePassFrmDState
  }
}
