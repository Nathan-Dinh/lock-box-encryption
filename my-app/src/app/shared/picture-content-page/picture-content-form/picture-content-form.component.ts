import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { UserGalleryDalService } from '../../../../services/database/user-gallery.dal.service'
import { UserInfoService } from '../../../../store/user-info-store.service'
import { PictureItem } from '../../../../models/picture-item.model'
import { Router } from '@angular/router'
import { GeoService } from '../../../../services/geo/geo.service'

@Component({
  selector: 'picture-content-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './picture-content-form.component.html',
  styleUrl: './picture-content-form.component.css',
})
export class PictureContentFormComponent implements OnInit {
  @Output() img = new EventEmitter<string>()
  @Output() id = new EventEmitter<string>()

  private frmBuilder = inject(FormBuilder)
  private route = inject(ActivatedRoute)
  private ugDalService = inject(UserGalleryDalService)
  private uiService = inject(UserInfoService)
  private gSErvice = inject(GeoService)
  private router = inject(Router)
  public imgSrc: string
  public frmPicContent: any
  public desControl: FormControl
  public dateControl: FormControl
  public pictureItem: any

  constructor() {
    this.imgSrc = ''
    this.pictureItem = {}
    this.frmPicContent = this.frmBuilder.group({
      description: ['', []],
      date: new FormControl({ value: '', disabled: true }),
    })
    this.desControl = this.frmPicContent.controls['description']
    this.dateControl = this.frmPicContent.controls['date']
  }

  async ngOnInit(): Promise<void> {
    const geoContainer = document.getElementById('geo-container') as HTMLElement
    const ID_VALUE = this.route.snapshot.queryParamMap.get('id') as string
    const GALLERY_ITEM = (await this.ugDalService.findGalleryItem(
      ID_VALUE,
      this.uiService.getUserName()
    )) as any
    this.pictureItem = GALLERY_ITEM
    this.desControl.setValue(GALLERY_ITEM.description)
    this.dateControl.setValue(this.getDate(GALLERY_ITEM.date as Date))
    this.imgSrc = GALLERY_ITEM.imgData
    const LAT = GALLERY_ITEM.geolocation.latitude
    const LNG = GALLERY_ITEM.geolocation.longitude
    await this.gSErvice.showMap(LAT, LNG, geoContainer)
    this.img.emit(GALLERY_ITEM.imgData)
    this.id.emit(GALLERY_ITEM.id)
  }

  private getDate(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // January is 0!
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  public deleteGalleryItem() {
    if (confirm('Picture content will be lost')) {
      this.ugDalService.deleteGalleryItem(
        this.pictureItem.id,
        this.uiService.getUserName()
      )
      this.router.navigate(['/home/gallery'])
    }
  }

  public editGalleryItem() {
    if (confirm('Is information correct')) {
      const ITEM = new PictureItem(
        this.pictureItem.imgData,
        this.desControl.value,
        this.pictureItem.geolocation,
        this.pictureItem.date,
        this.pictureItem.id
      )
      this.ugDalService.editGalleryItem(ITEM, this.uiService.getUserName())
    }
  }
}
