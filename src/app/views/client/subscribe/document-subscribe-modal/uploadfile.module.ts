import { SignatureCardComponent } from './signature-card/signature-card.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignaturePadModule } from 'angular2-signaturepad';
import { DocumentSubscribeModalComponent } from './document-subscribe-modal.component';
import { UploadFileCardComponent } from './upload-file-card/upload-file-card.component';
import { TakePhotoCardComponent } from './take-photo-card/take-photo-card.component';
import { MatIconModule } from '@angular/material/icon';
import { ImageCropperModule } from 'ngx-image-cropper';
import { IonicModule } from '@ionic/angular';

const COMPONENTS = [
  DocumentSubscribeModalComponent,
  UploadFileCardComponent,
  SignatureCardComponent,
  TakePhotoCardComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ImageCropperModule,
    SignaturePadModule,
    IonicModule.forRoot(),
  ],
  exports: [...COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UploadfileModule { }
