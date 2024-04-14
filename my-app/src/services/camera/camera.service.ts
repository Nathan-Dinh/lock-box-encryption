import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

declare const Camera: any
declare const navigator: any

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private _capturedImage = new BehaviorSubject<string>('')

  constructor() {
  }

  setCapturedImage(base64Data: string) {
    this._capturedImage.next(base64Data)
  }

  get capturedImage() {
    return this._capturedImage.asObservable()
  }

  capturePhoto(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let localData: string
      let options = {
        quality: 30,
        sourceType: Camera.PictureSourceType.CAMERA,
        destinationType: Camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: false,
      }
      navigator.camera.getPicture((data: any) => {
        localData = 'data:image/jpeg;base64,' + data
        resolve(localData)
      }, (e: any) => {
        console.log('CameraService: error in capture')
        reject(e)
      }, options)
    })
  }

}
