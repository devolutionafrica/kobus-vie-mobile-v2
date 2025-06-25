import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-signature-card',
  templateUrl: './signature-card.component.html',
  styleUrls: ['./signature-card.component.scss'],
})
export class SignatureCardComponent implements OnInit {

  @Output() eventNext: EventEmitter<any> = new EventEmitter();
  @Output() eventPrevious: EventEmitter<any> = new EventEmitter();
  @ViewChild(SignaturePad, { static: false }) signaturePad: SignaturePad;

  screenWidth = window.innerWidth;
  screenHeigth = window.innerHeight;

  isWrite = false

  signature = '';
  isDrawing = false;
  signaturePadOptions = {
    minWidth: 1,
    canvasWidth: this.screenWidth - 40,
    canvasHeight: this.screenHeigth - 150,
    backgroundColor: '#fff',
    penColor: '#222428'
  };

  constructor() { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.signaturePad.clear();
  }

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 5);
    this.signaturePad.clear();
  }

  drawComplete() {
    this.isDrawing = false;
  }

  drawStart() {
    this.isDrawing = true;
  }

  savePad() {
    this.signature = this.signaturePad.toDataURL();
    this.signaturePad.clear();
    this.isWrite = true;
    console.log('value :::> ', this.signature)
  }

  clearPad() {
    this.signaturePad.clear();
  }

  onNext(){
    const imageSrc = {
      base64: [this.signature],
      fileId: 'signature',
      filename: Date.now().toString()
    };
    this.eventNext.emit(imageSrc)
  }

  editSignature(){
    this.isWrite = false
  }

  goBack(){
    this.eventPrevious.emit()
  }

}
