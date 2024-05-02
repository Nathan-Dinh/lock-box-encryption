import { Component, inject, OnInit } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { FormsStateService } from '../../../../services/observable/forms-state.service'
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl
} from '@angular/forms'
import { MatIcon } from '@angular/material/icon'

@Component({
  selector: 'change-pass-form',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatButton,
  ],
  templateUrl: './change-pass-form.component.html',
  styleUrl: './change-pass-form.component.css',
})
export class ChangePassFormComponent implements OnInit {
  private frmBuilder: FormBuilder = inject(FormBuilder)
  private fsService: FormsStateService = inject(FormsStateService)
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
    this.newPassword = this.changePassFrm.controls['passwordGroup'].controls['newPassword'] as FormControl
    this.rePassword = this.changePassFrm.controls['passwordGroup'].controls['rePassword'] as FormControl
    this.fsService.setChangePassFrmDState('none')
    this.changePassFrm.reset()
  }

  ngOnInit(): void {
    //Creates connection to observable
    this.fsService.getChangePassFrmDState().subscribe((data) => {
      this.passwordChangeStatus = data as string
    })
  }

  closePassChangeClick() {
    this.fsService.setChangePassFrmDState('none')
    this.changePassFrm.reset()
  }

  passChangeSubmitHandler() {
    if (this.changePassFrm.valid) {
      console.log('Good')
    } else {
      console.log('Bad')
    }
  }

  public matchPassword(control: AbstractControl): any {
    let password1: FormControl = control.get('newPassword') as FormControl
    let password2: FormControl = control.get('rePassword') as FormControl
    if (password1.value != password2.value) return { inValidPass: true }
    else if (password1.value == '' && password2.value == '')
      return { passValuesBlank: true }
    else return null
  }
}
