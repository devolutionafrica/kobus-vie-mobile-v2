import { ModalController } from "@ionic/angular";
import { Component, Input, OnInit } from "@angular/core";
import { IGarantieFacultative } from "src/app/core/entities/Produit";
import { ICapitaux } from "src/app/core/factory/PropositionFactory";
import { GarantieFacultativeService } from "src/app/core/usercases/GarantieFacultative.Service";
import { SouscriptionToolsService } from "src/app/core/usercases/SouscriptionTools.Service";

@Component({
  selector: 'garantie-modal',
  templateUrl: './garantie-modal.component.html',
  styleUrls: ['./garantie-modal.component.scss'],
})

export class GarantieModalComponent implements OnInit {

  @Input() listGarantie: IGarantieFacultative[]
  currentSelection: IGarantieFacultative[]
  callbackCapitauxResponse: ICapitaux[]
  @Input() detailProduit: any

  newGaranties: IGarantieFacultative[]

  constructor(
    private ctrlModal: ModalController,
    private souscriptionApi: SouscriptionToolsService,
    private grntieService: GarantieFacultativeService){
      this.currentSelection = []
    }

  ngOnInit(){
    this.grntieService.updateGarantieFacultativeByListCapitaux(this.listGarantie, this.detailProduit)
      .then(
        response => {
          this.newGaranties = response as IGarantieFacultative[]
        }
      )
    }

  closeModal(){
      this.ctrlModal.dismiss()
    }

  addGarantie(garantie: IGarantieFacultative){
      this.grntieService.addGarantie(garantie)
    }

  popGarantie(garantie: IGarantieFacultative){
      this.grntieService.removeGarantie(garantie)
    }

  getCapitauxGaranties(garantie: IGarantieFacultative){
    const params = {
      "Capital": garantie.montantSouscrit,
      "ProduitId": this.detailProduit.idProduit,
      "Fractionnment": this.detailProduit.fractionnement,
      "GarantieSupplementaire": {
        "GarantieId": garantie.identifiant,
      }
    }
    this.souscriptionApi.getCapitauxParGarantieFacultative(params)
      .then(
        respnse => {
          if(respnse) this.callbackCapitauxResponse = respnse as ICapitaux[]
        }
      )
    }
}
