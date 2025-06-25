import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-liste-impayes',
  templateUrl: './liste-impayes.page.html',
  styleUrls: ['./liste-impayes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ListeImpayesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
