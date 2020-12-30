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
  #loadingFetch: boolean = false;
  #loadingFetchFallback: boolean = false;
  #satellitesUrl:string;
  constructor() {
    this.title = 'orbit-report-A';
    this.sourceList = [];
    this.displayList = [];
    this.#loadingFetch = false;
    this.#loadingFetchFallback = false;
    this.#satellitesUrl  = 'https://handlers.education.launchcode.org/static/satellites.json'; 
    this.fetch();
  }
  
  fetch() {    
    let S=this;
    window.fetch(this.#satellitesUrl).then(function(response) {
      if (!response || !('json' in response)) {
        S.fetchFallback();
        return
      }
      response.json().then(function(data) {
        S.receive(data);
      }.bind(S));
    }.bind(S));

  }

  fetchFallback() {
    if (this.#loadingFetchFallback)
      return false;  
    let xmlhttp = new XMLHttpRequest(), S=this;
    this.#loadingFetchFallback = true;
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        S.#loadingFetchFallback = false;
        let data = JSON.parse(this.responseText);
        S.receive(data)
      }
    }.bind(S);
    xmlhttp.open("GET", this.#satellitesUrl, true);
    xmlhttp.send();    
    
  }

  receive(data) {
    let fetchedSatellites = data.satellites;          
    for (let idx=0,list=fetchedSatellites,sat; idx<list.length; idx++) {
      sat = list[idx];
      this.sourceList.push(new Satellite(sat.name, sat.type, sat.launchDate, sat.orbitType, sat.operational));  
    }
    this.displayList=this.sourceList.slice(0);    
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
