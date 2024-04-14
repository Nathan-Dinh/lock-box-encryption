import { GeoLocation } from "./geo-location.model"

export class PictureItem {
  public id: string
  public imgData: string
  public description: string
  public geolocation: GeoLocation
  public date: Date

  constructor(
    imgData: string,
    description: string,
    geolocation: GeoLocation,
    date: Date,
    id: string
  ) {
    this.id = id
    this.imgData = imgData
    this.geolocation = geolocation
    this.description = description
    this.date = date
  }
}
