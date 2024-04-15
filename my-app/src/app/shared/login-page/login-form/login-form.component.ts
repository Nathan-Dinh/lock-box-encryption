import { Component, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms'
import { User } from '../../../../models/user.model'
import { UserCookieEncryptionService } from '../../../../services/crypto/user-cookie-encryption.service'
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
  private ceService = inject(UserCookieEncryptionService)
  private authControl = inject(AuthControlService)
  private route = inject(Router)
  private frmBuilder = inject(FormBuilder)
  private uiService = inject(UserInfoService)
  public errorMessage: string

  public userForm: any

  constructor() {
    this.errorMessage = ''
    this.userForm = this.frmBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

 public async onSubmitHandler(): Promise<void> {
    if (this.userForm.valid) {
      const USER_NAME: string = this.userForm.value.userName as string
      const PASSWORD: string = this.userForm.value.password as string
      const USER: User = new User(USER_NAME, PASSWORD)
      if (await this.authControl.authorizedUser(USER)) {
        this.uiService.setUser(USER)
        this.authControl.setAuth(true)
        this.ceService.setUserCookie(USER)
        this.route.navigate(['/home'])
      } else this.errorMessage = 'User could not be found'
    } else
      this.errorMessage =
        'There was a issue. Verify if field values are correct'
  }
}