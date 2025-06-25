import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'agence-item',
  templateUrl: './agence-item.component.html',
  styleUrls: ['./agence-item.component.scss'],
})
export class AgenceItemComponent implements OnInit {

  @Input() agence: IAgence
  hrefLink:string = ""
  constructor() { }

  ngOnInit() {
    this.hrefLink = `https://www.google.com/maps?q=${this.agence.Longitude},${this.agence.Latitude}`
  }

}

export interface IAgence {
  DistrictAgence: string;
  IdAgence: number;
  Latitude: number;
  Longitude: number;
  TelephoneAgence: string;
  LocalisationAgence: string;
}
