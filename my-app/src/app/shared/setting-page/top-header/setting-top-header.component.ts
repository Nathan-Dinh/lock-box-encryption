import { Component, inject } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { Router } from '@angular/router';

@Component({
  selector: 'setting-top-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './setting-top-header.component.html',
  styleUrl: './setting-top-header.component.css',
})
export class TopHeaderComponent {
  private router = inject(Router)

  public backClicked(){
    this.router.navigate([".."]);
  }
}
