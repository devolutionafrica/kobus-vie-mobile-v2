import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular/standalone';
import { PanierService } from 'src/app/core/usercases/Panier.Service';
import { IonRow, IonCol, IonText,  IonIcon} from '@ionic/angular/standalone';
import { NgIf, NgClass} from '@angular/common';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
  imports:[NgIf, NgClass, IonRow, IonCol, IonText,  IonIcon]
})
export class ModalInfoComponent implements OnInit {
  @Input() msgData

  statusOperate:boolean
  constructor(
    private route:Router,
    private panierService: PanierService,
    private ctrlModal: ModalController) {
    this.statusOperate = false
   }

  ngOnInit() {
    const statusTransaction = this.msgData.codeStatutTransaction
    this.statusOperate = statusTransaction !== "ECH" && statusTransaction !== null ? true : false
  }

  onCloseModal(){
    if (this.statusOperate ) {
      this.panierService.panierBehaviorSubject.next([])
      this.route.navigateByUrl('/dashboard')
    }
    this.ctrlModal.dismiss()
  }

}
