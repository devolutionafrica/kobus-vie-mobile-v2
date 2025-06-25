import { IntegrateurService } from './Integrateur.Service';
import { AppInitConfigService } from './AppInitConfig.Service';
import { ModeReglementService } from './ModeReglement.Service';
import { NgModule } from '@angular/core';
import { EXTRANET_CONFIG_API } from 'src/app/repository/EXTRANET_CONFIG_API';
import { FilialeService } from './Filiale.Service';
import { OperateurMobileService } from './OperatorList.Service';
import { PeriodiciteService } from './Periodicite.Service';
import { TypeDemandePrestationService } from './TypeDemandePrestation.Service';
import { CGUService } from './CGB.Service';
import { AgenceService } from './Agence.Service';

@NgModule({
  providers: [
    CGUService,
    AgenceService,
    FilialeService,
    PeriodiciteService,
    IntegrateurService,
    EXTRANET_CONFIG_API,
    AppInitConfigService,
    ModeReglementService,
    OperateurMobileService,
    TypeDemandePrestationService,
  ]
})
export class EXTRANET_CONFIG_MODULE {}
