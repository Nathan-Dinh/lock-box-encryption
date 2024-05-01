import { Component, inject } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms'

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css',
})
export class AccountInfoComponent {
  private frmBuilder: FormBuilder = inject(FormBuilder)
  public passwordChangeStatus: string
  public changePassFrm: any
  public curPassword: FormControl
  public newPassword: FormControl
  public rePassword: FormControl

  constructor() {
    this.passwordChangeStatus = 'none'
    this.changePassFrm = this.frmBuilder.group({
      curPassword: ['', [Validators.required]],
      passwordGroup: this.frmBuilder.group(
        {
          newPassword: ['', [Validators.required]],
          rePassword: ['', [Validators.required]],
        },
        {
          validators: this.matchPassword,
        }
      ),
    })
    this.curPassword = this.changePassFrm.controls['curPassword'] as FormControl
    this.newPassword =
      this.changePassFrm.controls['passwordGroup'].controls['newPassword']
    this.rePassword =
      this.changePassFrm.controls['passwordGroup'].controls['rePassword']
  }

  showPassChangeClick() {
    this.passwordChangeStatus = 'block'
    this.changePassFrm.reset()
  }

  closePassChangeClick() {
    this.passwordChangeStatus = 'none'
    this.changePassFrm.reset()
  }

  passChangeSubmitHandler() {
    if(this.changePassFrm.valid){
      console.log("Good")
    }else{
      console.log("Bad")
    }
  }

  public matchPassword(control: AbstractControl): any {
    let password1: FormControl = control.get('newPassword') as FormControl
    let password2: FormControl = control.get('rePassword') as FormControl
    if (password1.value != password2.value) return { inValidPass: true }
    else if (password1.value == '' && password2.value == '') return { passValuesBlank: true }
    else return null
  }
}
