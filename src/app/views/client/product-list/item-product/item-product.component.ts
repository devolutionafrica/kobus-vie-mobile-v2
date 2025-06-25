import {
  Input,
  OnInit,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCol, IonRow, IonText, IonIcon } from '@ionic/angular/standalone';
import { IProduit } from 'src/app/core/entities/Produit';

@Component({
  selector: 'app-item-product',
  templateUrl: './item-product.component.html',
  styleUrls: ['./item-product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCol,
    IonRow,
    IonText,
    IonIcon
  ]
})
export class ItemProductComponent implements OnInit {

  @Input() produit: IProduit;
  @Output() detailProduitEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

  openModal() {
    this.detailProduitEvent.emit(this.produit.produitId);
  }
}
