import { Component } from '@angular/core'
import { LoginFormComponent } from '../../shared/login-page/login-form/login-form.component'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  constructor() {
    alert('Trigger3')
    fetch('https://meowfacts.herokuapp.com/')
      .then((response) => {
        alert('Trigger')
        return response.json()
      })
      .then((date) => {
        alert('Trigger2')
        alert(date)
      })
      .catch((error) => {
        alert(error)
      })
  }
}
