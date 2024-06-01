import { Component, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms'
import { AuthService } from '../../../../services/auth/auth.service'

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private authService = inject(AuthService)
  private frmBuilder = inject(FormBuilder)
  public errorMessage: string

  public userForm: any

  constructor() {
    this.errorMessage = ''
    this.userForm = this.frmBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  public async onSubmitHandler(): Promise<void> {
    if (this.userForm.valid) {
      const USER_NAME: string = this.userForm.value.userName as string
      const PASSWORD: string = this.userForm.value.password as string
      if (!this.authService.login(USER_NAME, PASSWORD))
        this.errorMessage = 'User could not be found'
    } else
      this.errorMessage =
        'There was a issue. Verify if field values are correct'
  }
}