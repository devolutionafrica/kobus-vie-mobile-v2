import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonRow, IonCol, IonAvatar, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'item-integrator-pay',
  templateUrl: './item-integrator-pay.component.html',
  styleUrls: ['./item-integrator-pay.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonRow,
    IonCol,
    IonAvatar,
    IonImg
  ]
})
export class ItemIntegratorPayComponent {
  @Input() data: any;
  @Input() amount: number;
  @Output() openPaymentModal = new EventEmitter<any>();

  remoteSelectedData() {
    this.openPaymentModal.emit(this.data);
  }
}
