import { Component, inject } from '@angular/core'
import { UserInfoService } from '../../../../store/user-info-store.service'
import { User } from '../../../../models/user.model'
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms'
import { Router } from '@angular/router'
import { UserDalService } from '../../../../services/database/user.dal.service'
import { UserCookieEncryptionService } from '../../../../services/crypto/user-cookie-encryption.service'

@Component({
  selector: 'account-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css',
})
export class AccountFormComponent {
  private uiService: UserInfoService = inject(UserInfoService)
  private builder: FormBuilder = inject(FormBuilder)
  private uDalService: UserDalService = inject(UserDalService)
  private ceService: UserCookieEncryptionService = inject(
    UserCookieEncryptionService
  )
  private router: Router = inject(Router)
  public user: User
  public showPassword: boolean
  public updateMode: boolean
  public accFrm: any
  private passControl: FormControl

  constructor() {
    this.user = this.uiService.getUser()
    this.showPassword = false
    this.updateMode = false

    this.accFrm = this.builder.group({
      userName: new FormControl(
        { value: this.user.userName, disabled: true },
        Validators.required
      ),
      password: new FormControl(
        { value: this.user.password, disabled: true },
        Validators.required
      ),
    })
    this.passControl = this.accFrm.controls['password']
  }

  public showPasswordClickHandler() {
    this.showPassword = !this.showPassword
  }

  public updatePasswordClickHandler() {
    this.showPassword = true
    this.passControl.enable()
    this.updateMode = true
  }

  public cancelClickHandler() {
    this.showPassword = false
    this.passControl.disable()
    this.updateMode = false
  }

  public deleteUser() {
    if (
      confirm(
        'Continuing will delete all data pertaining to user. Would you like to continue?'
      )
    ) {
      this.uDalService.delete(this.user)
      this.ceService.deleteUserCookie()
      alert('User has been successfully deleted')
      this.router.navigate(['login'])
    }
  }

  public updateUser() {
    if (confirm('Is this the password you want to use?')) {
      this.user.password = this.passControl.value
      this.uDalService.update(this.user)
      this.ceService.setUserCookie(this.user)
      this.uiService.resetUserValue(this.user.userName)
      this.cancelClickHandler()
      alert('Password has been changed')
    }
  }
}
