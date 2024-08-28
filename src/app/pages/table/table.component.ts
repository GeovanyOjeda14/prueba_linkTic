import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  private apiService = inject(ApiService);
  public myData: any;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.apiService.getRequest('https://jsonplaceholder.typicode.com/posts').subscribe( data => {
      console.log(data);
      this.myData = data;
    });
  }
}
