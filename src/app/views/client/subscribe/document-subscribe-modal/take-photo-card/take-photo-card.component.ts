import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-take-photo-card',
  templateUrl: './take-photo-card.component.html',
  styleUrls: ['./take-photo-card.component.scss'],
})
export class TakePhotoCardComponent implements OnInit {

  @Output() eventNext: EventEmitter<any> = new EventEmitter();
  @Output() eventTakeFile: EventEmitter<any> = new EventEmitter();
  @Input() photoIdentitePath: string;

  cropperImage = '';
  isLoadFile = false;
  isFile = false;
  listFileSelected = [];

  constructor() { }

  ngOnInit() {}

  async launchCamera() {
    this.eventTakeFile.emit();
    this.isLoadFile = false;
  }

  imageCropped(event: ImageCroppedEvent){
    this.cropperImage = event.base64;
    this.isFile = !this.isLoadFile;
  }

  validateIdentitePhoto(){
    this.isLoadFile = true;
    this.isFile = !this.isLoadFile;
    this.listFileSelected.push(this.cropperImage)
  }

  onNext(){
    const imageSrc = {
      base64: this.listFileSelected,
      fileId: 'identitie',
      filename: Date.now().toString()
    };
    this.eventNext.emit(imageSrc)
  }

}
