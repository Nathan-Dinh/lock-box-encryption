import { Component, inject } from '@angular/core'
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms'
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'create-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.css',
})
export class CreateUserFormComponent {
  builder = inject(FormBuilder)

  createUserForm = this.builder.group({
    userName: ['', [Validators.required]],
    passwordGroup: this.builder.group(
      {
        _password: ['', [Validators.required]],
        _password2: ['', [Validators.required]],
      },{ validators: this.matchPassword }
    ),
  })

  // userName: ['', [Validators.required]],
  // passwordGroup: this.builder.group(
  //   {
  //     _password: ['', [Validators.required]],
  //     _password2: ['', [Validators.required]],
  //   },{ validator: this.matchPassword }
  // ),

  matchPassword(control: AbstractControl) {
    console.log('trigger')
    return { passwordGroupError: true }
  }
}
