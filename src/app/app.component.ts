import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Book } from '../models/book'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpClient]
})
export class AppComponent {
  title = 'box-the-house-client';
  books: any;

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:4741/books.json').subscribe(res => this.books = res);
  }
}
