import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryItemLocationService {
  private serviceProvider: Subject<object> = new Subject<object>();

  setLocation(data : object){
    this.serviceProvider.next(data)
  }

  sendLocation(){
    return this.serviceProvider.asObservable() 
  }
}
