import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, MatSelectModule, MatInputModule, MatFormFieldModule],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css',
})
export class AccountInfoComponent {
  public passwordChangeStatus: string

  constructor() {
    this.passwordChangeStatus = "none"
  }

  showPassChangeClick(){
    this.passwordChangeStatus = "block"
  }

  closePassChangeClick(){
    this.passwordChangeStatus = "none"
  }
}
