export class Gallery {

  id?: number;
  date: Date;
  title: string;
  description: string;
  imageData: string | null;

  constructor(date: Date, title: string, description: string, imageData: string | null, id?: number) {
    if (id) this.id = id;
    this.date = date;
    this.title = title;
    this.description = description;
    this.imageData = imageData;
  }
}
