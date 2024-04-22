import { Component, HostListener, Input, inject } from '@angular/core'
import { UserCookieEncryptionService } from '../../../../services/crypto/user-cookie-encryption.service'
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'top-header-nav',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './top-header-nav.component.html',
  styleUrl: './top-header-nav.component.css',
})
export class TopHeaderNavComponent {
  @Input() headerTitle: string
  private uceService = inject(UserCookieEncryptionService)
  public isNavHidden: boolean
  public lastScrollTop: number

  constructor() {
    this.headerTitle = ''
    this.isNavHidden = false
    this.lastScrollTop = 0
  }

  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
    const SCROLL_TOP = window.pageYOffset || document.documentElement.scrollTop
    if (SCROLL_TOP > this.lastScrollTop && SCROLL_TOP > 100) {
      this.isNavHidden = true // Scrolling down
    } else {
      this.isNavHidden = false
    }
    this.lastScrollTop = SCROLL_TOP <= 0 ? 0 : SCROLL_TOP
  }

  public signOutClickHandler(): void {
    this.uceService.deleteUserCookie()
  }
}
