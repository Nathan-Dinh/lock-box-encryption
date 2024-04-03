import { Component } from '@angular/core';
import { HomeHeaderComponent } from '../../shared/components/home-header/home-header.component';
import { BottomHomeHeaderComponent } from '../../shared/components/bottom-home-header/bottom-home-header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeHeaderComponent,BottomHomeHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

}
