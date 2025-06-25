import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LanguageService } from 'src/shared/services/language/language.service';
import { ModalPrestationComponent } from '../modal-prestation/modal-prestation.component';
import Swal from 'sweetalert2'
import { colors } from 'src/app/config/colors';
import { IContrat, IPrestation } from 'src/app/models/contrat.model';

@Component({
  selector: 'app-tab-prestation-contrat',
  templateUrl: './tab-prestation-contrat.component.html',
  styleUrls: ['./tab-prestation-contrat.component.scss'],
})
export class TabPrestationContratComponent implements OnInit {

  @Input() contratDetail:IContrat
  @Input() userAction:string
  prestationEmpty:boolean
  prestations:IPrestation[] = []

  constructor(
    private translate:LanguageService,
    public modalCtrl: ModalController){}


  infoModalPresent(){
    const message = `
    Vous ne pouvez pas faire de
    demande sur cette police.
    Nous vous prions de contactez votre
    assurrance pour plus de detail.
    `
    Swal.fire({
      icon: 'info',
      confirmButtonColor: colors.secondary,
      allowOutsideClick: false,
      confirmButtonText: `Fermer`,
      text: message,
    })
  }

  async presentPrestationModal() {
    if (this.userAction !== 'Actif') this.infoModalPresent()
    else {
      const modal = await this.modalCtrl.create({
        component: ModalPrestationComponent,
        cssClass: 'modal-prest-cmp',
        componentProps: {'prData': this.contratDetail}
      });
      return await modal.present();
    }
  }

  ngOnInit() {
    this.prestations = this.contratDetail.prestationSinistres.data as IPrestation[]
    this.prestationEmpty = this.contratDetail.prestationSinistres.count > 0 ? false : true
  }

  addNewPrestation = ()=>{
    this.presentPrestationModal()
  }

}
