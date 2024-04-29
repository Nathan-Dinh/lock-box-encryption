import { Component, inject } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { UserCookieEncryptionService } from '../../../../../services/crypto/user-cookie-encryption.service'
import { RouterModule } from '@angular/router'
import { Router } from '@angular/router'

@Component({
  selector: 'app-setting-content',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, RouterModule],
  templateUrl: './setting-content.component.html',
  styleUrl: './setting-content.component.css',
})
export class SettingContentComponent {
  private uceService = inject(UserCookieEncryptionService)
  private route = inject(Router)

  public options = [
    {
      subtitle: 'Account Setting',
      options: [
        {
          name: 'Account Info',
          icon: 'account_circle',
          route: 'account-info'
        },
      ],
    },
    {
      subtitle: 'Database Information',
      options: [
        {
          name: 'Clear Database',
          icon: 'clear_all',
          route: 'database'
        },
      ],
    },
    {
      subtitle: 'About',
      options: [
        {
          name: 'Help',
          icon: 'help',
          route: 'help'
        },
        {
          name: 'About',
          icon: 'info',
          route: 'about'
        },
      ],
    },
  ]

  public signOutClickHandler(): void {
    this.uceService.deleteUserCookie()
    this.route.navigate(['login'])
  }
}
