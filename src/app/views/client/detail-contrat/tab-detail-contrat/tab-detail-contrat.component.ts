import { Tools } from 'src/shared/tools/utils';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalController } from '@ionic/angular/standalone';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'src/app/providers/store.service';
import { IContrat, IDetailContrat } from 'src/app/models/contrat.model';
import { DownloaderService } from 'src/app/core/usercases/Downloader.Service';
//import { LanguageService } from 'src/shared/services/language/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ReleveDetailPdfComponent } from '../releve-detail-pdf/releve-detail-pdf.component';
import { SessionService } from 'src/app/providers/session.service';
import { SpinnerConfigService } from 'src/shared/tools/spinner-config.service';
import { AvisSituationPdfComponent } from '../avis-situation-pdf/avis-situation-pdf.component';
import { alertIcon, AlertModal } from 'src/shared/tools/modal';
import { DomSanitizer } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf, DatePipe, DecimalPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonRow, IonCol } from '@ionic/angular/standalone';

export default {
  standalone: true,
  selector: 'app-tab-detail-contrat',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    IonRow, IonCol,
    NgFor,
    NgIf,
    DatePipe,
    DecimalPipe,
    TranslateModule
  ]
};
@Component({
  selector: 'app-tab-detail-contrat',
  templateUrl: './tab-detail-contrat.component.html',
  styleUrls: ['./tab-detail-contrat.component.scss'],
})

export class TabDetailContratComponent implements OnInit {
  @Input() contrat:IContrat
  countImpayee = 0
  devise:string
  dateFinPolice:Date
  constructor(
    private sanitizer: DomSanitizer,
    private ctrlModal:ModalController,
    private store:StoreService,
    private _session: SessionService,
    private spinner:NgxSpinnerService,
    private downloadService:DownloaderService,
    private _configSpinner: SpinnerConfigService,
    private translate:TranslateService) {
      this.devise = store.storeValue(APP_STORAGE_KEY.FILIALE).devise
    }

  ngOnInit() {
    console.log('detail contrat :::> ', this.contrat)
    this.countImpayee = this.contrat.impayes.count
    const detailContrat = this.contrat.detailContrat as IDetailContrat
    const currentData = Tools.formatDate(detailContrat.dateEffet)
    this.dateFinPolice = Tools.getContratCloseTime(currentData, detailContrat.dureePolice)
  }

  async presentModalReleve( pdfSource:any ){
    const modal = await this.ctrlModal.create({
      id: 'pdfModalComponent',
      component: ReleveDetailPdfComponent,
      cssClass: 'modal-releve-pdf-cmp',
      componentProps: {'srcPdf': pdfSource}
    })
    return await modal.present()
  }

  async presentModalAvisSituation( pdfSource:any ){
    const modal = await this.ctrlModal.create({
      id: 'pdfModalAvisSituationComponent',
      component: AvisSituationPdfComponent,
      cssClass: 'modal-avis-situation-pdf',
      componentProps: {'srcPdf': pdfSource}
    })
    return await modal.present()
  }

  onDownloadFileAvisSituation(){
    this._configSpinner.setMessage("Votre avis de situation est en chargement")
    this.spinner.show()
    const parms = {"NumeroDePolice": this.contrat.detailContrat.numeroPolice}

    this.downloadService.downloadAvisSituationPDFBinFormat(parms)
  .then(
    (binData: any) => {
      console.log(binData);
      if (binData.dataCount !== 0) {
        const blob = new Blob([binData], { type: 'application/pdf' }); // Assurez-vous que le type est correct
        const pdfUrl = URL.createObjectURL(blob);
        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
        this.presentModalAvisSituation({
          serverUrl: this.store.storeValue(APP_STORAGE_KEY.FILIALE).fileDirPath,
          pdfSource: safeUrl,
          header: parms
        });
      } else {
        AlertModal.show("", "Aucun document n'a été trouvé. RDV dans nos agences pour plus d'informations", alertIcon.info, true, "Revenir");
      }
    }
  ).catch( error =>  console.log('Error detected :::> ', error) )
      .finally( ()=> this.spinner.hide() )
  }

  onDownloadFileReleveCotisation(){
    this._configSpinner.setMessage("Votre relevé de cotisation est en chargement")
    this.spinner.show()
    const currentUser = this._session.storeValue(APP_STORAGE_KEY.CURRENT_USER)
    const fileData = {
      "Filiale": currentUser.codeFiliale,
      "NumeroPolice": this.contrat.detailContrat.numeroPolice,
      "DateDebut":"2016-01-03T00:00:00Z",
      "DateFin": new Date(),
      "NumeroClient": currentUser.nuClient
    }

    this.downloadService.downloadPDFBinFormat(fileData)
      .then(
          binData => {
            console.log(URL.createObjectURL(binData))
            if(binData.size > 1200)
              this.presentModalReleve({
                serverUrl: this.store.storeValue(APP_STORAGE_KEY.FILIALE).fileDirPath,
                header: fileData,
                pdfSource: URL.createObjectURL(binData)
              })
            else
              AlertModal
                .show("", "Aucun document n'a été trouvé. RDV dans nos agences pour plus d'informations", alertIcon.info, true, "Revenir")
          }
      )
      .catch( error =>  console.log('Error detected :::> ', error) )
      .finally( ()=> this.spinner.hide() )
  }

}
