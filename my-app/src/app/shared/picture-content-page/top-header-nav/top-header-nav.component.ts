import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'pic-top-header-nav',
  standalone: true,
  imports: [],
  templateUrl: './top-header-nav.component.html',
  styleUrl: './top-header-nav.component.css'
})
export class TopHeaderNavComponent {
  private location = inject(Location)

  public goBack(){
    this.location.back()
  }
}
