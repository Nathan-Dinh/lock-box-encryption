import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { BottomHeaderNavComponent } from '../../shared/components/bottom-header-nav/bottom-header-nav.component';

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [ RouterOutlet,BottomHeaderNavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent {}
