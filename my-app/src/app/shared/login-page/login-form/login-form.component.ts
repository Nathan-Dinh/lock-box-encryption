import { Component, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms'
import { CookieService } from 'ngx-cookie-service'
import { UserDalService } from '../../../../services/database/user.dal.service'
import { User } from '../../../../models/user.model'
import { CookieEncryptionService } from '../../../../services/crypto/cookie-encryption.service'
import { AuthControlService } from '../../../../store/auth-store.service'
import { Router } from '@angular/router'
import { UserInfoService } from '../../../../store/user-info-store.service'

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private userDal = inject(UserDalService)
  private ceService = inject(CookieEncryptionService)
  private cService = inject(CookieService)
  private authControl = inject(AuthControlService)
  private route = inject(Router)
  private frmBuilder = inject(FormBuilder)
  private uiService = inject(UserInfoService)
  public errorMessage: string = ''

  userForm = this.frmBuilder.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    keepMeLoggedIn: ['', []],
  })

  onSubmitHandler(): void {
    if (this.userForm.valid) {
      const USER_NAME: string = this.userForm.value.userName as string
      const PASSWORD: string = this.userForm.value.password as string
      const USER: User = new User(USER_NAME, PASSWORD)
      this.userDal.findUser(USER.userName).then((data) => {
        if (data !== null) {
          this.authControl.authorize()
          this.uiService.setUser(USER)
          this.route.navigate(['/home/gallery']) // Might need to change
          if (this.userForm.value.keepMeLoggedIn) {
            const C_BODY: string = USER.userName + '-' + USER.password
            const C_Name: string = 'session'
            this.cService.set(C_Name, this.ceService.encryptCookie(C_BODY))
          }
        } else this.errorMessage = 'User could not be found'
      })
    } else
      this.errorMessage =
        'There was a in form. Verify if field value are correct'
  }
}
