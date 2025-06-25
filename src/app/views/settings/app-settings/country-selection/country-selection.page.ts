import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonButtons, IonBackButton, IonHeader, IonButton, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon, IonImg} from '@ionic/angular/standalone';
import { IFiliale } from 'src/app/core/entities/Filiale';
import { FilialeIcon } from 'src/app/config/filialeFlag';

@Component({
  selector: 'app-country-selection',
  templateUrl: './country-selection.page.html',
  styleUrls: ['./country-selection.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonButton,
    IonItem,
    IonLabel,
    IonIcon, IonImg,IonButtons, IonBackButton
  ]
})
export class CountrySelectionPage implements OnInit {
  countries : IFiliale[];
  selectedCountry: IFiliale;
  constructor() { }

  ngOnInit() {
    this.countries = [
      { filiale: 'Cameroon', icon: FilialeIcon.CM_VIE, codeFiliale: 'CM', devise: 'XAF', fileDirPath: '/assets/flags/cameroon.png', hostname: 'https://cameroon.example.com', souscriptionUrl: 'https://cameroon.example.com/souscription' },
      { filiale: 'Congo', icon: FilialeIcon.CG_VIE, codeFiliale: 'CG', devise: 'XAF', fileDirPath: '/assets/flags/congo.png', hostname: 'https://congo.example.com', souscriptionUrl: 'https://congo.example.com/souscription' },
      { filiale: 'Gabon', icon: FilialeIcon.GB_VIE, codeFiliale: 'GA', devise: 'XAF', fileDirPath: '/assets/flags/gabon.png', hostname: 'https://gabon.example.com', souscriptionUrl: 'https://gabon.example.com/souscription' },
      { filiale: 'Senegal', icon: FilialeIcon.SN_VIE, codeFiliale: 'SN', devise: 'XOF', fileDirPath: '/assets/flags/senegal.png', hostname: 'https://senegal.example.com', souscriptionUrl: 'https://senegal.example.com/souscription' },
      { filiale: 'Ivory Coast', icon: FilialeIcon.CI_VIE, codeFiliale: 'CI', devise: 'XOF', fileDirPath: '/assets/flags/ivory_coast.png', hostname: 'https://ivorycoast.example.com', souscriptionUrl: 'https://ivorycoast.example.com/souscription' },    
    ];
    this.selectedCountry = this.countries[3]; // Default selection
  }

  selectCountry(country: any) {
    this.selectedCountry = country;
  }
  saveCountry() {
    // Logic to save the selected country
    console.log('Selected Country:', this.selectedCountry.filiale);
    // You can add further logic here, such as navigating to another page or saving to a service
  }

}
