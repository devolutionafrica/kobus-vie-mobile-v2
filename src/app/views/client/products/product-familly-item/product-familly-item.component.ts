// import { IFamilleProduit } from './../../../../core/entities/Produit';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFamilleProduit } from 'src/app/core/entities/Produit';

@Component({
  selector: 'app-product-familly-item',
  templateUrl: './product-familly-item.component.html',
  styleUrls: ['./product-familly-item.component.scss'],
})
export class ProductFamillyItemComponent implements OnInit {
  @Input() data:IFamilleProduit
  @Output() moveDetail:EventEmitter<any> = new EventEmitter<any>()
  constructor() { }

  ngOnInit() {}

  goToProduitDetail(){
    this.moveDetail.emit(this.data)
  }

}
