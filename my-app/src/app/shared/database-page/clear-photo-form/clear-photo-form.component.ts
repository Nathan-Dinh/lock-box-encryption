import { Component, OnInit, ViewChild, inject } from '@angular/core'
import { MatButton } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsStateService } from '../../../../services/observable/forms-state.service'
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
  FormGroupDirective,
} from '@angular/forms'
import { MatIcon } from '@angular/material/icon'
import { UserInfoService } from '../../../../store/user-info-store.service'

@Component({
  selector: 'clear-photo-form',
  standalone: true,
  imports: [
    MatButton,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './clear-photo-form.component.html',
  styleUrl: './clear-photo-form.component.css',
})
export class ClearPhotoFormComponent implements OnInit {
  private fsService: FormsStateService = inject(FormsStateService)
  private frmBuilder: FormBuilder = inject(FormBuilder)
  private uiService: UserInfoService = inject(UserInfoService)
  public clearPhotoFrmDState: string
  public clearPhotoFrm: any
  public curPassword: FormControl
  public rePassword: FormControl

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective

  constructor() {
    this.clearPhotoFrm = this.frmBuilder.group(
      {
        curPassword: ['', [Validators.required]],
        rePassword: ['', [Validators.required]],
      },
      { validators: this.matchPassword }
    )
    this.curPassword = this.clearPhotoFrm.controls['curPassword']
    this.rePassword = this.clearPhotoFrm.controls['rePassword']
    this.clearPhotoFrmDState = 'none'
    this.fsService.setClearPhotoFrmDState('none')
  }

  public ngOnInit(): void {
    this.fsService.getClearPhotoFrmDState().subscribe((data) => {
      this.clearPhotoFrmDState = data
    })
  }

  public closeClearPhotoFrmClick() {
    this.fsService.setClearPhotoFrmDState('none')
    this.formDir.resetForm()
  }

  public async handlerOnSubmit() {
    const PASSWORD: string = this.curPassword.value as string
    if (
      this.clearPhotoFrm.valid &&
      (await this.uiService.comparePassword(PASSWORD))
    ) {
      console.log('Trigger')
    }
  }

  public matchPassword(control: AbstractControl): any {
    let password1: FormControl = control.get('curPassword') as FormControl
    let password2: FormControl = control.get('rePassword') as FormControl
    if (password1.value != password2.value) return { inValidPass: true }
    else if (password1.value == '' && password2.value == '')
      return { passValuesBlank: true }
    else return null
  }
}
