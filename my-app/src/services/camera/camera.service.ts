import { inject, Injectable } from '@angular/core'
import { GalleryDalService } from '../database/gallery.dal.service';
import { Gallery } from '../../models/gallery.model'
declare const Camera: any;
declare const navigator: any;

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  setCapturedImage(image: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem('photo', image);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }


  getCapturedImage() : string | null {
    return localStorage.getItem('photo');
  }

  capturePhoto(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let localData: string;
      let options = {
        quality: 30,
        sourceType: Camera.PictureSourceType.CAMERA,
        destinationType: Camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: false
      }
      navigator.camera.getPicture((data: any) => {
        localData = "data:image/jpeg;base64," + data;
        resolve(localData)
      }, (e: any) => {
        console.log("CameraService: error in capture");
        localStorage.removeItem('photo');
        reject(e)
      }, options)
    });
  }
  //
  // loadPhotoFromLibrary(): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     let localData: any;
  //     let options = {
  //       quality: 50,
  //       sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
  //       destinationType: Camera.DestinationType.DATA_URL
  //     }
  //     navigator.camera.getPicture((data: any) => {
  //       localData = "data:image/jpeg;base64," + data;
  //       resolve(localData)
  //     }, (e: any) => {
  //       console.log("CameraService: error in load from library")
  //       reject(e)
  //     }, options)
  //
  //   });
  // }

  async getCapturedImages(): Promise<Gallery[]> {
    try {
      const galleries = await this.galleryDalService.retrieveGalleries();
      return galleries;
    } catch (error) {
      console.error('Error getting captured images', error);
      return [];
    }
  }


  constructor(private galleryDalService: GalleryDalService) {
  }
}
