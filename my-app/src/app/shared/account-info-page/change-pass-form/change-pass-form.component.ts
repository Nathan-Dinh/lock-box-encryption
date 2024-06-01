import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core'
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
  AbstractControl,
  FormGroupDirective,
} from '@angular/forms'
import { UserDalService } from '../../../../services/database/user.dal.service'
import { UserInfoService } from '../../../../store/user-info-store.service'
import { MatIcon } from '@angular/material/icon'
import { User } from '../../../../models/user.model'

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
  private uiService: UserInfoService = inject(UserInfoService)
  private udService: UserDalService = inject(UserDalService)
  public passwordChangeStatus: string
  public changePassFrm: any
  public curPassword: FormControl
  public newPassword: FormControl
  public rePassword: FormControl
  public noneState: string

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective

  constructor() {
    this.noneState = 'none'
    this.passwordChangeStatus = this.noneState
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
    this.newPassword = this.changePassFrm.controls['passwordGroup'].controls[
      'newPassword'
    ] as FormControl
    this.rePassword = this.changePassFrm.controls['passwordGroup'].controls[
      'rePassword'
    ] as FormControl
    this.fsService.setChangePassFrmDState(this.noneState)
    this.changePassFrm.reset()
  }

  public ngOnInit(): void {
    //Creates connection to observable
    this.fsService.getChangePassFrmDState().subscribe((data) => {
      this.passwordChangeStatus = data as string
    })
  }

  public closePassChangeClick(): void {
    this.fsService.setChangePassFrmDState(this.noneState)
    this.formDir.resetForm()
  }

  public async passChangeSubmitHandler(): Promise<void> {
    if (this.changePassFrm.valid) {
      const USER_NAME = this.uiService.getUserName()
      const NEW_PASSWORD = this.curPassword.value
      if (await this.udService.comparePassword(USER_NAME, NEW_PASSWORD)) {
        const user: User = (await this.udService.find(USER_NAME)) as User
        user.password = this.newPassword.value as string
        this.udService
          .update(user)
          .then(() => alert('Password has been updated'))
        this.closePassChangeClick()
      }
      alert('Incorrect password')
    }
  }

  public matchPassword(control: AbstractControl): {} | null {
    let password1: FormControl = control.get('newPassword') as FormControl
    let password2: FormControl = control.get('rePassword') as FormControl
    if (password1.value != password2.value) return { inValidPass: true }
    else if (password1.value == '' && password2.value == '')
      return { passValuesBlank: true }
    else return null
  }
}
