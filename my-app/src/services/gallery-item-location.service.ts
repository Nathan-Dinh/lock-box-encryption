import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class GalleryItemLocationService {
  private serviceProvider: BehaviorSubject<object> =
    new BehaviorSubject<object>(new Object())

  setCoordinates(data: object) {
    this.serviceProvider.next(data)
  }

  getCoordinates() {
    return this.serviceProvider.asObservable()
  }
}
