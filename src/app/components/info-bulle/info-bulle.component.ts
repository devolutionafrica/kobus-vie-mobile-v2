import { Component, Input, OnInit } from "@angular/core";
import {IonButton,ModalController} from '@ionic/angular/standalone';
import {MsgCtntComponent} from './msg-ctnt/msg-ctnt.component';
@Component({
  selector: 'info-bulle',
  template: `<div id="info-bulle" ><ion-button (click)=buttonclick()>Click</ion-button></div>`,
  styleUrls: ['./info-bulle.component.scss'],
  imports : [IonButton]
})
export class InfoBulleComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController){}

  ngOnInit(): void {}
  buttonclick(): void{
    this.presentModal('modal titre','message test', 'blue')
  }
  async presentModal(title:string, msg: string, bgColor?: string){
    const modal = await this.modalCtrl.create({
      component: MsgCtntComponent,
      cssClass: 'info_bulle-ctnt',
      componentProps: {
        title: title,
        message: msg,
        callback: this.dimissModal
      }
    }).then()
    return await modal.present()
  }

  dimissModal = ()=>{
    console.log('message dismiss log')
    this.modalCtrl && this.modalCtrl.dismiss()
  }

}

