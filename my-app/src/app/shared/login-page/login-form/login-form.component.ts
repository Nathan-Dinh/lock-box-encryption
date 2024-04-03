import { Component, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms'
import { CookieService } from 'ngx-cookie-service'
import { UserDalService } from '../../../../services/user.dal.service'
import { User } from '../../../../models/user.model'
import { CookieEncryptionService } from '../../../../services/crypto/cookie-encryption.service'
import { AuthControlService } from '../../../../services/auth/auth-control.service'
import { Router } from '@angular/router'

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
          console.log(this.authControl.isAuth)
          this.route.navigate(['/home/gallery'])
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
