import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import {IonRow,IonCol, IonIcon} from '@ionic/angular/standalone';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports : [NgClass, IonIcon, IonRow,IonCol]
})
export class AlertComponent implements OnInit {
  @Input() icon: string
  @Input() type: string;
  @Input() message: string;
  constructor() { }

  ngOnInit() {}

}
