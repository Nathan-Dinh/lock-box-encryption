import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { DatabaseService } from '../services/database/database.service' 
import { AppUrlService } from '../services/observable/app-url.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  private dbService : DatabaseService = inject(DatabaseService)
  private auService : AppUrlService = inject(AppUrlService) 

  constructor(private router: Router){
    this.dbService.initDatabase();
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.auService.setUrl(event.url);
      }
    });
  }
}
