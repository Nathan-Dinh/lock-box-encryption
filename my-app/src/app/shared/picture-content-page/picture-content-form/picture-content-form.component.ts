import { Component, Input, OnInit, inject } from '@angular/core'
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

@Component({
  selector: 'picture-content-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './picture-content-form.component.html',
  styleUrl: './picture-content-form.component.css',
})
export class PictureContentFormComponent implements OnInit {
  private frmBuilder = inject(FormBuilder)
  private route = inject(ActivatedRoute)
  private ugDalService = inject(UserGalleryDalService)
  private uiService = inject(UserInfoService)
  public imgSrc: string
  public frmPicContent: any
  public desControl: FormControl
  public dateControl: FormControl

  constructor() {
    this.imgSrc = ''
    this.frmPicContent = this.frmBuilder.group({
      description: ['', []],
      date: new FormControl({ value: '', disabled: true }),
    })
    this.desControl = this.frmPicContent.controls['description']
    this.dateControl = this.frmPicContent.controls['date']
  }

  async ngOnInit(): Promise<void> {
    const ID_VALUE = this.route.snapshot.queryParamMap.get('id') as string
    const GALLERY_ITEM = await this.ugDalService.findGalleryItem(
      ID_VALUE,
      this.uiService.getUserName()
    ) as any
    this.desControl.setValue(GALLERY_ITEM.description)
    this.dateControl.setValue(this.getDate(GALLERY_ITEM.date as Date))
    this.imgSrc = GALLERY_ITEM.imgData
  }

  getDate(date:Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // January is 0!
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}
