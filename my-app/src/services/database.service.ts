import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  db: any;
  createDatabase(): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("LBEDB", 1);
      request.onerror = (event) => {
        console.error("Error in creating database.");
        reject("Error in creating database");
      }
      request.onsuccess = (event) => {
        // @ts-ignore
        this.db = event.target.result;
        resolve(this.db);
      }
      request.onupgradeneeded = (event) => {
        // @ts-ignore
        this.db = event.target.result;
        this.db.createObjectStore("users", {
          keyPath: "id",
          autoIncrement: true,
        });
        this.db.createObjectStore("user_gallery", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    });
  }

  initDatabase() {
    this.createDatabase().then((data) => {
      console.log("Database created successfully " + data);
    }).catch((e) => {
      console.log("Error in database creation: " + e.message);
    });
  }
}
