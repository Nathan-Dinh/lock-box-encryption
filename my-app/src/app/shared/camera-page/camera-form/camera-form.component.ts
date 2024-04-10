import { Component, inject } from '@angular/core'
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms'

@Component({
  selector: 'camera-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './camera-form.component.html',
  styleUrl: './camera-form.component.css',
})
export class CameraFormComponent {
  private frmBuilder = inject(FormBuilder)

  public itemForm = this.frmBuilder.group({
    description: ['', []],
    date: new FormControl(
      { value: this.setCurrentDate(), disabled: true }),
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
}
