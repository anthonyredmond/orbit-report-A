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
    
  constructor() {
    this.title = 'orbit-report-A';
    this.sourceList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
 
    let sL = this.sourceList;

    window.fetch(satellitesUrl).then(function(response) {
       response.json().then(function(data) {
          let fetchedSatellites = data.satellites;          
          for (let idx=0,list=fetchedSatellites,sat; idx<list.length; idx++) {
            sat = list[idx];
            sL.push(new Satellite(sat.name, sat.type, sat.launchDate, sat.orbitType, sat.operational));  
          }          
       }.bind(sL));
    }.bind(sL));
 
 }

  ngOnInit() {
    

  }
}
