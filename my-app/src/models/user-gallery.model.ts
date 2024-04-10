import { PictureItem } from "./picture-item.model"

export class UserGallery{
    private gallery_item: PictureItem[]
    private userName: string

    constructor(userName:string){
        this.gallery_item = [] 
        this.userName = userName
    }
}