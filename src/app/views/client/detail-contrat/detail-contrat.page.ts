import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detail-contrat',
  templateUrl: './detail-contrat.page.html',
  styleUrls: ['./detail-contrat.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailContratPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
