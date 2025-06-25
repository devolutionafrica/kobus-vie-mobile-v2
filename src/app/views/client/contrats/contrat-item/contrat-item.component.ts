import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContrat } from 'src/app/models/contrat.model';
import {IonRow, IonCol,IonIcon} from '@ionic/angular/standalone';

@Component({
  selector: 'app-contrat-item',
  templateUrl: './contrat-item.component.html',
  styleUrls: ['./contrat-item.component.scss'],
  imports: [IonRow, IonCol, IonIcon]
})
export class ContratItemComponent implements OnInit {
  @Input() data:IContrat
  @Input() devise:string
  constructor(private router:Router) { }

  ngOnInit() {}

  moveToDetailContrat = ()=>{
    this.router.navigate(['/detail-contrat', this.data.detailContrat.numeroPolice])
  }

}
