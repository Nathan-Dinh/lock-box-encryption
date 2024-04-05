import { Component, HostListener  } from '@angular/core'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'home-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.css',
})
export class HomeHeaderComponent {
  isNavHidden = false;
  lastScrollTop = 0;

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
