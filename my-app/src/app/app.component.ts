import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabaseService } from '../services/database/database.service' 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  private dbService : DatabaseService = inject(DatabaseService)

  constructor(){
    this.dbService.initDatabase();
  }
}
