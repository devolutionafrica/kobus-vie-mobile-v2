import { Component, Input, OnInit } from '@angular/core';
import { IReglement, IReglementPrestation } from 'src/app/models/contrat.model';

@Component({
  selector: 'app-tab-reglement-contrat',
  templateUrl: './tab-reglement-contrat.component.html',
  styleUrls: ['./tab-reglement-contrat.component.scss'],
})
export class TabReglementContratComponent implements OnInit {
  @Input() reglementDetail:IReglementPrestation
  @Input() userAction:string
  reglements: IReglement[] = []
  isEmpty: boolean = true

  constructor() { }

  ngOnInit() {
    this.reglements = this.reglementDetail.data
    this.isEmpty = this.reglementDetail.count > 0 ? false : true
    console.log("reglement detail :::> ", this.reglements)
  }

}
