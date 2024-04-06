import {Injectable} from '@angular/core';

declare const Camera: any;
declare const navigator: any;

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private capturedImage: any;
  capturedImages: any[] = [];

  setCapturedImage(image: any): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.capturedImage = image;
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }


  getCapturedImage() {
    return this.capturedImage;
  }

  capturePhoto(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let localData: any;
      let options = {
        quality: 50,
        sourceType: Camera.PictureSourceType.CAMERA,
        destinationType: Camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: true
      }
      navigator.camera.getPicture((data: any) => {
        localData = "data:image/jpeg;base64," + data;
        this.capturedImages.push(localData);
        resolve(localData)
      }, (e: any) => {
        console.log("CameraService: error in capture")
        reject(e)
      }, options)
    });
  }

  loadPhotoFromLibrary(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let localData: any;
      let options = {
        quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.DATA_URL
      }
      navigator.camera.getPicture((data: any) => {
        localData = "data:image/jpeg;base64," + data;
        resolve(localData)
      }, (e: any) => {
        console.log("CameraService: error in load from library")
        reject(e)
      }, options)

    });
  }

  getCapturedImages() {
    return this.capturedImages;
  }

  constructor() {
  }
}
