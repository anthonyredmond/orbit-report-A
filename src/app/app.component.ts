import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title: string;  
  sourceList: Satellite[];
  displayList: Satellite[];
    
  constructor() {
    this.title = 'orbit-report-A';
    this.sourceList = [];
    this.displayList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
 
    let sL = this.sourceList, dL = this.displayList;

    window.fetch(satellitesUrl).then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
        debugger
      } else {
        if (response && response.json) {
          response.json().then(function(data) {
            let fetchedSatellites = data.satellites;          
            for (let idx=0,list=fetchedSatellites,sat; idx<list.length; idx++) {
              sat = list[idx];
              sL.push(new Satellite(sat.name, sat.type, sat.launchDate, sat.orbitType, sat.operational));  
            }
            dL = sL.slice(0);
          }.bind(sL, dL));
        } else {
          dL=[];
          debugger
        }
      }  
    }.bind(sL, dL));
 
 }

  ngOnInit() {
  }

  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    for(let i=0; i < this.sourceList.length; i++) {
        let name = this.sourceList[i].name.toLowerCase();
        if (name.indexOf(searchTerm) >= 0) {
          matchingSatellites.push(this.sourceList[i]);
        }
    }
    // assign this.displayList to be the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
  }  
}
