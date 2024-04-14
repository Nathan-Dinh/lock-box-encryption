import { PictureItem } from "./picture-item.model";

export class UserGallery{
    userName: string
    userGallery: {[id:string] : PictureItem }
    constructor(userName: string){
        this.userGallery = {}
        this.userName = userName
    }
}