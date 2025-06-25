import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Tools } from 'src/shared/tools/utils';

@Component({
  selector: 'app-upload-file-card',
  templateUrl: './upload-file-card.component.html',
  styleUrls: ['./upload-file-card.component.scss'],
})
export class UploadFileCardComponent implements OnInit {

  @Output() eventNext: EventEmitter<any> = new EventEmitter();
  @Output() eventTakeFile: EventEmitter<any> = new EventEmitter();
  @Input() photoIdentitePath: string;

  nbFile = 1;
  isTakePicture = false;
  cropperImage = '';
  isResizePicture = false;
  isCompleted = false;
  listFileSelected = [];
  typeFileSelected = '';
  isSelectedFile = false;

  typePieces = [
    {
      type: 'cni',
      value: 'Carte d\'identité',
      numberFile: 2
    },
    {
      type: 'ppt',
      value: 'Passeport',
      numberFile: 1
    },
    {
      type: 'pc',
      value: 'Permis de conduire',
      numberFile: 1
    },
    {
      type: 'adi',
      value: 'Attestation d\'identité',
      numberFile: 1
    }
  ];
  pieceSelected: string;

  constructor() { }

  ngOnInit() { }

  async launchCamera() {
    this.eventTakeFile.emit();
    this.isResizePicture = false;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.cropperImage = event.base64;
    this.isTakePicture = true;
  }

  validateIdentitePhoto() {
    this.isResizePicture = true;
    this.isTakePicture = false;
    this.listFileSelected.push(this.cropperImage);
    if (this.listFileSelected.length === this.nbFile) {this.isCompleted = true; }
  }

  onNext() {
    const imageSrc = {
      base64: this.listFileSelected,
      fileId: 'piece',
      filename: Date.now().toString()
    };
    this.eventNext.emit(imageSrc);
  }

  selectedFilePath(currentSelection: any) {
    const selectData = currentSelection.detail.value;
    this.nbFile = selectData.numberFile;
    this.typeFileSelected = selectData.value;
    this.isSelectedFile = true;
  }

  takeVersoPicture() {
    this.isTakePicture = false;
    this.typeFileSelected = '';
    this.isResizePicture = false;
    this.cropperImage = ''
  }

}
