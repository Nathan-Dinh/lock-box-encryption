import { Component } from '@angular/core'
import { AccountFormComponent } from '../../../shared/account-page/account-form/account-form.component'
import { TopHeaderNavComponent } from '../../../shared/components/top-header-nav/top-header-nav.component'

@Component({
  selector: 'account-page',
  standalone: true,
  imports: [TopHeaderNavComponent,AccountFormComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
 
}
