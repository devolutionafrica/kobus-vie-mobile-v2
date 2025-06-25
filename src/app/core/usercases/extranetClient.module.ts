import { FilialeSelectedService } from 'src/app/core/usercases/FilialeSelected.Service';
import { ResetAccountService } from './ResetAccount.Service';
import { PanierService } from './Panier.Service';
import { NgModule } from '@angular/core';
import { PrimeService } from './Prime.Service';
import { ContratClientService } from './ContratClient.Service';
import { EditProfilClientService } from './EditProfilClient.Service';
import { AuthentificationService } from './Authentification.Service';
import { DemandePrestationService } from './DemandePrestation.Service';
import { EXTRANET_CLIENT_API } from 'src/app/repository/EXTRANET_CLIENT_API';
import { SimulationDemandePrestationService } from './SimulationDemandePrestation.Service';
import { DownloaderService } from './Downloader.Service';
import { KobusClientUniqueService } from './KobusClientUnique.Service';
import { ExternalUniqueClientApi } from 'src/app/repository/EXTERNAL_UNIQUE_CLIENT_API';

@NgModule({
  providers: [
    PrimeService,
    PanierService,
    DownloaderService,
    ResetAccountService,
    EXTRANET_CLIENT_API,
    ContratClientService,
    FilialeSelectedService,
    ExternalUniqueClientApi,
    EditProfilClientService,
    AuthentificationService,
    DemandePrestationService,
    KobusClientUniqueService,
    SimulationDemandePrestationService
  ]
})
export class EXTRANET_CLIENT_MODULE {}
