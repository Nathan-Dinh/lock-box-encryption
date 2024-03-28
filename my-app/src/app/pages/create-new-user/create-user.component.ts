import { Component } from '@angular/core';
import { CreateUserFormComponent } from '../../shared/create-user-page/create-user-form/create-user-form.component';

@Component({
  selector: 'create-user',
  standalone: true,
  imports: [CreateUserFormComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

}
