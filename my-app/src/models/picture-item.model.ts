import { GeoLocation } from "./geo-location.model"

export class PictureItem {
  private id: string
  private imgData: string
  private description: string
  private geolocation: GeoLocation
  private date: Date

  constructor(imgData: string, description: string, geolocation: GeoLocation, date: Date, id: string) {
    this.id = id
    this.imgData = imgData
    this.geolocation = geolocation
    this.description = description
    this.date = date
  }

  getId(): string{
    return this.id
  }

  getDescription(): string{
    return this.description
  }
  
  getDate(): Date{
    return this.date
  }

  getImgDate(): string{
    return this.imgData
  }
  
  getGeoLocation(): object{
    return this.geolocation
  }


}
