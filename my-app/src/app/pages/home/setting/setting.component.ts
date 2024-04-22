import { Component, inject } from '@angular/core'
import { TopHeaderComponent } from '../../../shared/setting-page/top-header/setting-top-header.component'
import { MatIcon } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [TopHeaderComponent, MatCardModule, MatButtonModule, MatIcon],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent {
  public options = [
    {
      subtitle: 'Account Setting',
      options: [
        {
          name: 'Account Info',
          icon: 'account_circle',
        },
      ],
    },
    {
      subtitle: 'Database Information',
      options: [
        {
          name: 'Clear Database',
          icon: 'clear_all',
        },
      ],
    },
    {
      subtitle: 'About',
      options: [
        {
          name: 'Help',
          icon: 'help',
        },
        {
          name: 'About',
          icon: 'info',
        },
      ],
    },
  ]
}
