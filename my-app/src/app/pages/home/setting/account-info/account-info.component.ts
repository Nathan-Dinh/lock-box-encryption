import { Component, inject } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { FormsStateService } from '../../../../../services/observable/forms-state.service'
import { ChangePassFormComponent } from '../../../../shared/account-info-page/change-pass-form/change-pass-form.component'

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIcon,
    ChangePassFormComponent
  ],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css',
})
export class AccountInfoComponent {
  private fsService: FormsStateService = inject(FormsStateService)

  constructor() {
  }

  showPassChangeClick() {
    this.fsService.setChangePassFrmDState('block') 
  }
}
