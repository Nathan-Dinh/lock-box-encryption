import { Component } from '@angular/core'
import { TopHeaderComponent } from '../../../shared/setting-page/top-header/setting-top-header.component'
import { MatIcon } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [TopHeaderComponent,RouterOutlet, MatCardModule, MatButtonModule, MatIcon],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent {
}
