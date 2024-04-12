export class PictureItem {
  private id: string
  private imgData: string
  private description: string
  private geolocation: string
  private date: Date

  constructor(imgData: string, description: string, geolocation: string, date: Date, id: string) {
    this.id = id
    this.imgData = imgData
    this.geolocation = geolocation
    this.description = description
    this.date = date
  }

  getId(): string{
    return this.id
  }
}
