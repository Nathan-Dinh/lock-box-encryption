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
import { TopHeaderNavComponent } from '../../../shared/components/top-header-nav/top-header-nav.component'
import { Router } from '@angular/router'
import { UserDalService } from '../../../../services/database/user.dal.service'
import { UserCookieEncryptionService } from '../../../../services/crypto/user-cookie-encryption.service'

@Component({
  selector: 'account-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,TopHeaderNavComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  private uiService: UserInfoService = inject(UserInfoService)
  private builder: FormBuilder = inject(FormBuilder)
  private uDalService: UserDalService = inject(UserDalService)
  private ceService: UserCookieEncryptionService = inject(
    UserCookieEncryptionService
  )
  private router: Router = inject(Router)
  public user: User = this.uiService.getUser()
  public showPassword: boolean = false
  public updateMode: boolean = false

  public accFrm = this.builder.group({
    userName: new FormControl(
      { value: this.user.userName, disabled: true },
      Validators.required
    ),
    password: new FormControl(
      { value: this.user.password, disabled: true },
      Validators.required
    ),
  })

  private passControl: FormControl = this.accFrm.controls['password']

  showPasswordClickHandler() {
    this.showPassword = !this.showPassword
  }

  updatePasswordClickHandler() {
    this.showPassword = true
    this.passControl.enable()
    this.updateMode = true
  }

  cancelClickHandler() {
    this.showPassword = false
    this.passControl.disable()
    this.updateMode = false
  }

  deleteUser() {
    if(confirm("Continuing will delete all data pertaining to user. Would you like to continue?")){
      this.uDalService.delete(this.user)
      this.ceService.deleteUserCookie()
      alert("User has been successfully deleted")
      this.router.navigate(['login'])
    }
  }

  updateUser() {
    if(confirm("Is this the password you want to use?")){
      this.user.password = this.passControl.value
      this.uDalService.update(this.user)
      this.ceService.setUserCookie(this.user)
      this.uiService.resetUserValue(this.user.userName)
      this.cancelClickHandler()
      alert("Password has been changed")
    }
  }
}
