import { Component, inject } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { UserInfoService } from '../../../../../store/user-info-store.service'
import { FormsStateService } from '../../../../../services/observable/forms-state.service'
import { ChangePassFormComponent } from '../../../../shared/account-info-page/change-pass-form/change-pass-form.component'
import { DeleteUserFormComponent } from '../../../../shared/account-info-page/delete-user-form/delete-user-form.component'

@Component({
  selector: 'app-account-info',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIcon,
    ChangePassFormComponent,
    DeleteUserFormComponent,
  ],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css',
})
export class AccountInfoComponent {
  private fsService: FormsStateService = inject(FormsStateService)
  public uiService: UserInfoService = inject(UserInfoService)
  public userName: string

  constructor() {
    this.userName = this.uiService.getUserName()
  }

  showPassChangeClick() {
    this.fsService.setChangePassFrmDState('block')
  }

  showDeleteUserFrmClick() {
    this.fsService.setDeleteUserFrmState('block')
  }
}
