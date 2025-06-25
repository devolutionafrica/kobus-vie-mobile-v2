import { SouscriptionToolsService } from './SouscriptionTools.Service';
import { NgModule } from '@angular/core';
import { EXTRANET_SOUSCRIPTION_API } from 'src/app/repository/EXTRANET_SOUSCRIPTION_API';
import { ProduitService } from './Produit.Service';
import { BeneficiareService } from './Beneficiaire.Service';
import { PropositionService } from './Proposition.Service';
import { SimulationProduitService } from './SimulationProduit.Service';
import { GarantieFacultativeService } from './GarantieFacultative.Service';

@NgModule({
  providers:[
    ProduitService,
    PropositionService,
    BeneficiareService,
    GarantieFacultativeService,
    SouscriptionToolsService,
    EXTRANET_SOUSCRIPTION_API,
    SimulationProduitService,
  ]
})
export class EXTRANET_SOUSCRIPTION_MODULE{}
