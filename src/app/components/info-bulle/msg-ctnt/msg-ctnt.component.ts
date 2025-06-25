import { Component,Input, OnInit } from '@angular/core';
import {IonCard,IonCardHeader, IonCardContent, ModalController} from '@ionic/angular/standalone';

@Component({
  selector: 'msg-ctnt',
  templateUrl: './msg-ctnt.component.html',
  styleUrls: ['./msg-ctnt.component.scss'],
  imports: [IonCard,IonCardHeader, IonCardContent]
})
export class MsgCtntComponent  implements OnInit {
   @Input() title: string
  @Input() message:string
  @Input() callback:Function
  constructor() { }

  ngOnInit() {}
  closeModal(){
    console.log('Msg ctnt :::> ')
    this.callback()
  }

}
