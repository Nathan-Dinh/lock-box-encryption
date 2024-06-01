import { Component, inject } from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { RouterModule } from '@angular/router'
import { AuthService } from '../../../../../services/auth/auth.service'
import SettingConstants from '../../../../../constants/setting-constants'

@Component({
  selector: 'app-setting-content',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, RouterModule],
  templateUrl: './setting-content.component.html',
  styleUrl: './setting-content.component.css',
})
export class SettingContentComponent {
  public authService = inject(AuthService)
  public options: any = SettingConstants.SETTING_OPTIONS
}
