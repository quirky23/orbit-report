import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Satellite } from './satellite';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];
  constructor() {
    this.sourceList = [];
    this.displayList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

    window.fetch(satellitesUrl).then(function(response) {
      response.json().then(function(data) {

        let fetchedSatellites = data.satellites;
        fetchedSatellites.forEach(el => {
          let satellite = new Satellite(el.name,
            el.type,
            el.launchDate,
            el.orbitType,
            el.operational)
          this.sourceList.push(satellite);
          this.displayList = this.sourceList.slice(0);
        });
      }.bind(this));
    }.bind(this));
    
  }
  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();
    for(let i=0; i < this.sourceList.length; i++) {
       let name = this.sourceList[i].name.toLowerCase();
       let type = this.sourceList[i].type.toLowerCase();
       let orbitType = this.sourceList[i].orbitType.toLowerCase();
       if (name.indexOf(searchTerm) >= 0) {
          matchingSatellites.push(this.sourceList[i]);
       } else if (type.indexOf(searchTerm) >= 0) {
          matchingSatellites.push(this.sourceList[i]);
      } else if (orbitType.indexOf(searchTerm) >= 0) {
          matchingSatellites.push(this.sourceList[i]);
        }
       
      
    }
    
    this.displayList = matchingSatellites;
  
 }
  
} 