import { Component, inject } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router';
import { AppUrlService } from '../../../../services/observable/app-url.service'

@Component({
  selector: 'setting-top-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './setting-top-header.component.html',
  styleUrl: './setting-top-header.component.css',
})
export class TopHeaderComponent {
  private router: Router = inject(Router)
  private auService: AppUrlService = inject(AppUrlService)

  public backClicked(): void {
    const sub = this.auService.getCapturedURL().subscribe((event) => {
      this.router.navigate([event])
    })
    sub.unsubscribe()
  }
}
