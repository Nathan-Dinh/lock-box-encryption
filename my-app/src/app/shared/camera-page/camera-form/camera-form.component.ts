import { Component, Input, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms'
import { PictureItem } from '../../../../models/picture-item.model'
import { CameraService } from '../../../../services/camera/camera.service'
import { UserGalleryDalService } from '../../../../services/database/user-gallery.dal.service'
import { UserInfoService } from '../../../../store/user-info-store.service'
import { Router } from '@angular/router'

@Component({
  selector: 'camera-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './camera-form.component.html',
  styleUrl: './camera-form.component.css',
})
export class CameraFormComponent {
  @Input() imgsrc: string = ''
  private frmBuilder = inject(FormBuilder)
  private router = inject(Router)
  private uiService = inject(UserInfoService)
  private ugDalService = inject(UserGalleryDalService)

  public itemForm = this.frmBuilder.group({
    description: ['', []],
    date: new FormControl({ value: this.setCurrentDate(), disabled: true }),
  })

  public des = this.itemForm.controls['description'] as FormControl
  public date = this.itemForm.controls['date'] as FormControl

  setCurrentDate() {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  savePhoto(): void {
    const ID = 'id' + Math.random().toString(16).slice(2)
    const DES_VALUE = this.des.value

    const DATE_PARTS = this.date.value.split('-')
    const Y = parseInt(DATE_PARTS[0])
    const M = parseInt(DATE_PARTS[1]) - 1 // Month is zero-based (0-11)
    const D = parseInt(DATE_PARTS[2])

    const DATE_VALUE: Date = new Date(Y, M, D) as Date
    alert(this.imgsrc)
    const PICTURE_ITEM = new PictureItem(this.imgsrc, DES_VALUE, DATE_VALUE, ID)
    this.ugDalService
      .insertGallery(this.uiService.getUserName(), PICTURE_ITEM)
      .then(() => {
        console.log('Photo saved')
        localStorage.removeItem('photo')
        this.router.navigate(['home/gallery'])
      })
      .catch((err) => {
        console.error('Error saving photo', err)
        localStorage.removeItem('photo')
        this.router.navigate(['home/gallery'])
      })
  }
}
