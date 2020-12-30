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

  sort(column: string): void {
    this.satellites.sort(function(a: Satellite, b: Satellite): number {
      let nA:number=0, nB:number=0, sA:string='', sB:string='';
      switch(typeof column) {
        case 'number':
          nA = a[column];
          nB = b[column];
          if (nA<nB) {
            return -1
          } else if (nA>nB) {
            return 1
          } else 
            return 0;
          break;
        case 'string':
          sA = a[column];
          sB = b[column];
          if (sA<sB) {
            return -1
          } else if (sA>sB) {
            return 1
          } else 
            return 0;
          break;
        default:
          return 0;
      }
    });
  }
}
