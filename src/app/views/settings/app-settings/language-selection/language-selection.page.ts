import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.page.html',
  styleUrls: ['./language-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LanguageSelectionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
