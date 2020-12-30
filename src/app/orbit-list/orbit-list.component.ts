import { Component, OnInit, Input } from '@angular/core';
import { Satellite } from '../satellite';
@Component({
  selector: 'app-orbit-list',
  templateUrl: './orbit-list.component.html',
  styleUrls: ['./orbit-list.component.css']
})

export class OrbitListComponent implements OnInit {
  @Input() satellites: Satellite[];
  constructor() { 
    this.satellites = [];
  };

  ngOnInit() { };

  sort(columnName: string): void {
    this.satellites.sort(function(a: Satellite, b: Satellite): number {
       if(a[columnName] < b[columnName]) {
          return -1;
       } else if (a[columnName] > b[columnName]) {
          return 1;
       } else 
           return 0;
    });
  }
}
