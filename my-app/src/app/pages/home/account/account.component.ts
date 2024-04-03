import { Component, inject } from '@angular/core'
import { UserInfoService } from '../../../../store/user-info-store.service'
import { User } from '../../../../models/user.model'

@Component({
  selector: 'account-page',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  private uiService: UserInfoService = inject(UserInfoService)
  public showPassword  = false
  public user: User


  constructor() {
    this.user = this.uiService.getUser()
  }

  showPasswordClickHandler(){
    this.showPassword = !this.showPassword
  }


}
