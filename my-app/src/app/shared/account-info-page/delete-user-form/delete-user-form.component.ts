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
import { UserDalService } from '../../../../services/database/user.dal.service'
import { MatIcon } from '@angular/material/icon'
import { UserInfoService } from '../../../../store/user-info-store.service'
import { AuthService } from '../../../../services/auth/auth.service'

@Component({
  selector: 'delete-user-form',
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
  templateUrl: './delete-user-form.component.html',
  styleUrl: './delete-user-form.component.css',
})
export class DeleteUserFormComponent implements OnInit {
  private fsService: FormsStateService = inject(FormsStateService)
  private frmBuilder: FormBuilder = inject(FormBuilder)
  private udService: UserDalService = inject(UserDalService)
  private uiService: UserInfoService = inject(UserInfoService)
  private authService: AuthService = inject(AuthService)
  public deleteUserFrmState: string
  public deleteUserFrm: any
  public curPassControl: FormControl
  public rePassControl: FormControl

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective

  constructor() {
    this.deleteUserFrm = this.frmBuilder.group(
      {
        curPassword: ['', [Validators.required]],
        rePassword: ['', [Validators.required]],
      },
      { validators: this.matchPassword }
    )
    this.curPassControl = this.deleteUserFrm.controls['curPassword']
    this.rePassControl = this.deleteUserFrm.controls['rePassword']
    this.deleteUserFrmState = 'none'
    this.fsService.setDeleteUserFrmState('none')
    this.deleteUserFrm.reset()
  }

  public ngOnInit(): void {
    this.fsService.getDeleteUserFrmState().subscribe((data) => {
      this.deleteUserFrmState = data
    })
  }

  public closeDeleteUserFrm(): void {
    this.fsService.setDeleteUserFrmState('none')
    this.formDir.resetForm()
  }

  public async handlerFormSubmit(): Promise<void> {
    const USER_NAME: string = this.uiService.getUserName() as string
    const PASSWORD: string = this.curPassControl.value as string
    if (
      this.deleteUserFrm.valid &&
      (await this.udService.comparePassword(USER_NAME, PASSWORD))
    ) {
      if (confirm('Do you with to continue to delete')) {
        this.udService
          .delete(await this.udService.find(await this.uiService.getUserName()))
          .then(() => alert('User has been delete'))
        this.authService.signout
      } else this.closeDeleteUserFrm()
    } else alert('Password is wrong')
  }

  public matchPassword(control: AbstractControl): {} | null {
    let password1: FormControl = control.get('curPassword') as FormControl
    let password2: FormControl = control.get('rePassword') as FormControl
    if (password1.value != password2.value) return { inValidPass: true }
    else if (password1.value == '' && password2.value == '')
      return { passValuesBlank: true }
    else return null
  }
}
