export class PictureItem {
  private id: string
  private imgData: string
  private description: string
  private date: Date

  constructor(imgData: string, description: string, date: Date, id: string) {
    this.id = id
    this.imgData = imgData
    this.description = description
    this.date = date
  }

  getId(): string{
    return this.id
  }
}
