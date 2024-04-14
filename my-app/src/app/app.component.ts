import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabaseService } from '../services/database/database.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private dbService = inject(DatabaseService);

  ngOnInit(): void {
    this.initDB();
  }

  private initDB(): void {
    this.dbService.initDatabase().then(() => {
      console.log('Database initialized successfully');
    }).catch((error) => {
      console.error('Database initialization failed', error);
    });
  }
}
