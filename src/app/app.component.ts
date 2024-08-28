import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Button} from "primeng/button";
import {TableModule} from "primeng/table";
import {NgForOf} from "@angular/common";
import {HttpClientModule, HttpClient} from "@angular/common/http";

@Component({
  imports: [RouterOutlet, Button, TableModule, NgForOf, HttpClientModule],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.css',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'untitled';
  cols = [
    {
      field: 'name',
      header: 'Name'
    },
    {
      field: 'lastName',
      header: 'Last Name'
    },
    {
      field: 'city',
      header: 'City'
    }
  ];
  persons: any[] = [];

  private currentId = 1;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers(this.currentId);
  }

  fetchUsers(id: number): void {
    this.http.get<any>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .subscribe(data => {
        this.persons.push({
            name: data.name.split(' ')[0],
            lastName: data.name.split(' ')[1],
            city: data.address.city
          });
      });
  }

  incrementId(): void {
    this.currentId += 1;
    this.fetchUsers(this.currentId);
  }
}
