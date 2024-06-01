import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormsStateService {
  private changePassFrmDState: BehaviorSubject<string> =
    new BehaviorSubject<string>('none')
  private deleteUserFrmDState: BehaviorSubject<string> =
    new BehaviorSubject<string>('none')
  private clearPhotoFrmDState: BehaviorSubject<string> =
    new BehaviorSubject<string>('none')

  //Change user pass form
  setChangePassFrmDState(display: string) {
    this.changePassFrmDState.next(display)
  }

  getChangePassFrmDState(): Observable<string> {
    return this.changePassFrmDState
  }

  //Delete user form
  setDeleteUserFrmState(display: string) {
    this.deleteUserFrmDState.next(display)
  }

  getDeleteUserFrmState() {
    return this.deleteUserFrmDState
  }

  //Clear user photos
  setClearPhotoFrmDState(display: string) {
    this.clearPhotoFrmDState.next(display)
  }

  getClearPhotoFrmDState() {
    return this.clearPhotoFrmDState
  }
}
