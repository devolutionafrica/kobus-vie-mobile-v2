import { PlatformService } from 'src/shared/services/platform.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { FileTransfer } from '@capacitor/file-transfer';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { NgxSpinnerService } from 'ngx-spinner';
import { DownloaderService } from 'src/app/core/usercases/Downloader.Service';
import { SpinnerConfigService } from 'src/shared/tools/spinner-config.service';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { IonContent, IonRow, IonCol, IonText } from '@ionic/angular/standalone';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-avis-situation-pdf',
  templateUrl: './avis-situation-pdf.component.html',
  styleUrls: ['./avis-situation-pdf.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PdfViewerModule,
    IonContent,
    IonRow,
    IonCol,
    IonText,
    MatButtonModule,
    MatIconModule
  ]
})
export class AvisSituationPdfComponent implements OnInit {

  @Input() srcPdf:any
  page_width:number
  platformValue: string

  constructor(
    //private file,
    private platform:Platform,
    //private downloader: Downloader,
    private spinner:NgxSpinnerService,
    private ctrlModal:ModalController,
    private extranetAPI:DownloaderService,
    private platformService: PlatformService,
    private _configSpinner: SpinnerConfigService,
  ){}

  ngOnInit() {
    console.log('srcPdf :::> ', this.srcPdf)
    this.page_width = this.platform.width()
    this.platformValue = this.platformService.getPlatform()
  }

  closeModal() {
    this.ctrlModal.dismiss(null, null, 'pdfModalAvisSituationComponent')
  }

  ionViewDidLeave(){
    this.spinner.hide()
  }


  async downloadPDF(){
    this.spinner.show()
    this._configSpinner.setMessage('Veuillez patienter encore quelque minute ... ')
    console.log('download info :::> ', this.srcPdf.header)
    await this.extranetAPI.downloadAvisSituationPDFFileFormat(this.srcPdf.header).then(resp => {
      Filesystem.getUri({
        directory: Directory.Documents,
        path: resp.serverSavePath
      }).then((fileInfo) => {
        FileTransfer.downloadFile({
          url: `${this.srcPdf.serverUrl}${resp.serverSavePath}`,
          path: fileInfo.uri,
          progress: true
        })
        this.spinner.hide()
      }).catch((error) => {
        console.error('Error getting file URI:', error);
        this.spinner.hide()
      });
      console.log('File downloaded successfully:', resp);
    })
  }
}
