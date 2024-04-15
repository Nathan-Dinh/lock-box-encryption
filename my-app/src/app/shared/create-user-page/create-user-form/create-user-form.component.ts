import { Component, inject } from '@angular/core'
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms'
import { UserDalService } from '../../../../services/database/user.dal.service'
import { JsonPipe } from '@angular/common'
import { User } from '../../../../models/user.model'
import { Router } from '@angular/router'

@Component({
  selector: 'create-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.css',
})
export class CreateUserFormComponent {
  private frmBuilder = inject(FormBuilder)
  private userDal = inject(UserDalService)
  private router = inject(Router)
  public createUserForm: any
  public refUserName: FormControl
  public refPassword1: FormControl
  public refPassword2: FormControl

  constructor() {
    this.createUserForm = this.frmBuilder.group({
      userName: ['', [Validators.required]],
      passwordGroup: this.frmBuilder.group(
        {
          password1: ['', [Validators.required]],
          password2: ['', [Validators.required]],
        },
        { validators: this.matchPassword }
      ),
    })
    this.refUserName = this.createUserForm.controls['userName']
    this.refPassword1 =
      this.createUserForm.controls['passwordGroup'].controls['password1']
    this.refPassword2 =
      this.createUserForm.controls['passwordGroup'].controls['password2']
  }

  public onSubmitHandler(): void {
    if (this.createUserForm.valid) {
      try {
        const USER_NAME: string = this.createUserForm.value.userName as string
        const PASSWORD: string = this.createUserForm.value.passwordGroup
          ?.password1 as string
        const USER: User = new User(USER_NAME, PASSWORD)
        this.userDal.find(USER.userName).then((user) => {
          if (user === null) {
            this.userDal.insert(USER)
            this.router.navigate(['/login'])
            alert('User has been successfully added')
          } else {
            alert('The user you are trying to create, already exist')
          }
        })
        this.createUserForm.reset()
      } catch (error) {
        console.log(error)
      }
    }
  }

  public matchPassword(control: AbstractControl) : any {
    let password1: FormControl = control.get('password1') as FormControl
    let password2: FormControl = control.get('password2') as FormControl
    if (
      password1?.value != '' &&
      password2?.value != '' &&
      password1?.value == password2?.value
    ) {
      return null
    }
    return { passwordGroupError: true }
  }
}
