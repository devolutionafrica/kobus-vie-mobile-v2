import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { IonContent, IonRow, IonCol, IonText } from '@ionic/angular/standalone';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DownloaderService } from 'src/app/core/usercases/Downloader.Service'
import { Platform } from '@ionic/angular/standalone'
import { PlatformService } from 'src/shared/services/platform.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalController } from '@ionic/angular/standalone'

@Component({
  selector: 'app-releve-detail-pdf',
  templateUrl: './releve-detail-pdf.component.html',
  styleUrls: ['./releve-detail-pdf.component.scss'],
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
export class ReleveDetailPdfComponent implements OnInit {
  @Input() srcPdf: any;
  page_width: number;
  platformValue: string;

  constructor(
    private extranetAPI: DownloaderService,
    private platform: Platform,
    private platformService: PlatformService,
    private spinner: NgxSpinnerService,
    //private downloader: Downloader,
    private ctrlModal: ModalController
    
  ) {
    
  }

  ngOnInit() {
    // Initialization logic here
    console.log('srcPdf :::> ', this.srcPdf)
    this.page_width = this.platform.width()
    this.platformValue = this.platformService.getPlatform()
  }

  closeModal() {
    // Modal close logic here
    this.ctrlModal.dismiss(null, null, 'pdfModalComponent')
  }

  getPDF() {
    // Download PDF logic here
    window.open(this.srcPdf.pdfSource);
    var a = document.createElement('a');
    a.href = this.srcPdf.pdfSource;
    a.target = '_blank';
    a.download = 'bill.pdf';
    document.body.appendChild(a);
    a.click();
  }
}
