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
  constructor() {
    this.sourceList = [];
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
        });
        
        
      }.bind(this));
   }.bind(this));
    
  }
}