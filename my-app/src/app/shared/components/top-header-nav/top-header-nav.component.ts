import { Component, HostListener, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'top-header-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './top-header-nav.component.html',
  styleUrl: './top-header-nav.component.css',
})
export class TopHeaderNavComponent {
  @Input() headerTitle: string

  isNavHidden = false
  lastScrollTop = 0

  constructor() {
    this.headerTitle = ''
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (scrollTop > this.lastScrollTop && scrollTop > 100) {
      this.isNavHidden = true // Scrolling down
    } else {
      this.isNavHidden = false
    }
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
  }
}
