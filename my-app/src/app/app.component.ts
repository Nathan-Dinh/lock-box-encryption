import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatabaseService } from '../services/database.service' 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  dbService : DatabaseService

  constructor(){
    this.dbService = inject(DatabaseService)
  }

  ngOnInit() : void{
    this.dbService.createDatabase();
  }
}
