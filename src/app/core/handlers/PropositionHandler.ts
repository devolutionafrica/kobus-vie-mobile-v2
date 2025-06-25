import { CotationFactory, ICotation } from './../factory/CotationFactory';
import { IFiliale } from 'src/app/core/entities/Filiale';
import { BehaviorSubject } from 'rxjs';
import { IProposition } from '../entities/Propostion';
import { IExtranetSouscriptionAdaptor } from '../adaptors/IExtranetSouscriptionAdaptor';
import { StoreService } from 'src/app/providers/store.service';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { SessionService } from 'src/app/providers/session.service';

export abstract class PropositionHandler {
  message = '';
  propositions: IProposition[] = [];
  propositionBehaviorSubject: BehaviorSubject<IProposition[]>;
  cotationNumber: BehaviorSubject<number>;
  constructor(
    private _store: StoreService,
    private _session: SessionService,
    private propositionAPI: IExtranetSouscriptionAdaptor
  ) {
    if (!this._session.storeValue(APP_STORAGE_KEY.PROPOSITIONS))
      this._session.dispatch(APP_STORAGE_KEY.PROPOSITIONS, []);
    this.propositionBehaviorSubject = new BehaviorSubject<IProposition[]>(
      this.propositions
    );
    this.cotationNumber = new BehaviorSubject<number>(0);
    this.refreshLocalPropositionStorage();
  }

  protected async createContrat(queryBody: any): Promise<any> {
    const filiale = this._store.storeValue(APP_STORAGE_KEY.FILIALE) as IFiliale;
    const apporteurBureau = this._store.storeValue(
      APP_STORAGE_KEY.DEFAULT_APPORTEUR
    );

    let currentProposition: IProposition = {
      Compte: queryBody.Compte,
      Contrat: queryBody.Contrat,
      Paiement: queryBody.Paiement,
      Souscripteur: queryBody.Souscripteur,
      AssuresAssocies: queryBody.AssuresAssocies,
      Beneficiaires: queryBody.Beneficiaires,
      GarantiesSupplementairesSouscrites:
        queryBody.GarantiesSupplementairesSouscrites,
      QuestionnaireMedical: queryBody.QuestionnaireMedical,
      CodeApporteur: apporteurBureau,
      NomApporteur: '',
      Devise: filiale.devise,
      DetailSimulation: JSON.stringify(queryBody.DetailSimulation),
    };

    return await this.propositionAPI
      .createContrat(currentProposition)
      .then((propositionRawData) => {
        if (propositionRawData.Success) {
          currentProposition.Observation = {
            StatutPaiement: true,
            DateCreation: new Date(),
            Message: propositionRawData.Message,
            NumeroProposition:
              propositionRawData.PropositionCreatedView.NumeroProposition,
            NumeroPolice:
              propositionRawData.PropositionCreatedView.NumeroPolice,
            PropositionStatus: propositionRawData.Status,
          };
          // this.updateLocalStoragePropositions(currentProposition);
          return {
            status: propositionRawData.Success,
            requestCode: propositionRawData.Status,
            numeroProposition:
              propositionRawData.PropositionCreatedView.NumeroProposition,
            numeroPolice:
              propositionRawData.PropositionCreatedView.NumeroPolice,
            message: propositionRawData.Message,
          };
        } else {
          return {
            status: propositionRawData.Success,
            requestCode: propositionRawData.Status,
            message: propositionRawData.Message,
          };
        }
      });
  }

  protected async createContratByFile(queryBody: any): Promise<any> {
    var formData = new FormData();
    console.log('info data :::> ', queryBody);
    const filiale = this._store.storeValue(APP_STORAGE_KEY.FILIALE) as IFiliale;
    const apporteurBureau = this._store.storeValue(
      APP_STORAGE_KEY.DEFAULT_APPORTEUR
    );
    const pieceJointes = queryBody.PieceJoints as any;

    let currentProposition: IProposition = {
      Compte: queryBody.Compte,
      Contrat: queryBody.Contrat,
      Paiement: queryBody.Paiement,
      Souscripteur: queryBody.Souscripteur,
      AssuresAssocies: queryBody.AssuresAssocies,
      Beneficiaires: queryBody.Beneficiaires,
      GarantiesSupplementairesSouscrites:
        queryBody.GarantiesSupplementairesSouscrites,
      QuestionnaireMedical: queryBody.QuestionnaireMedical,
      CodeApporteur: apporteurBureau,
      NomApporteur: '',
      Devise: filiale.devise,
      DetailSimulation: JSON.stringify(queryBody.DetailSimulation),
    };
    formData.append('proposition', JSON.stringify(currentProposition));

    for (const piece of pieceJointes)
      formData.append(piece.id, piece.base64[0], piece.filename);

    return this.propositionAPI
      .createContratByFile(formData)
      .then((propositionRawData) => {
        if (propositionRawData.Success) {
          currentProposition.Observation = {
            Message: propositionRawData.Message,
            DateCreation: new Date(),
            StatutPaiement: true,
            NumeroProposition:
              propositionRawData.PropositionCreatedView.NumeroProposition,
            NumeroPolice:
              propositionRawData.PropositionCreatedView.NumeroPolice,
            PropositionStatus: propositionRawData.Status,
          };
          // this.updateLocalStoragePropositions(currentProposition);
          return {
            status: propositionRawData.Success,
            requestCode: propositionRawData.Status,
            numeroProposition:
              propositionRawData.PropositionCreatedView.NumeroProposition,
            numeroPolice:
              propositionRawData.PropositionCreatedView.NumeroPolice,
            message: propositionRawData.Message,
          };
        } else {
          return {
            status: propositionRawData.Success,
            requestCode: propositionRawData.Status,
            message: propositionRawData.Message,
          };
        }
      });
  }

  protected async saveCotation(queryBody: any): Promise<any> {
    const filiale = this._store.storeValue(APP_STORAGE_KEY.FILIALE) as IFiliale;
    const apporteurBureau = this._store.storeValue(
      APP_STORAGE_KEY.DEFAULT_APPORTEUR
    );

    let currentProposition: IProposition = {
      NomApporteur: '',
      Compte: queryBody.Compte,
      Contrat: queryBody.Contrat,
      Paiement: queryBody.Paiement,
      Souscripteur: queryBody.Souscripteur,
      Beneficiaires: queryBody.Beneficiaires,
      AssuresAssocies: queryBody.AssuresAssocies,
      DetailSimulation: queryBody.DetailSimulation,
      GarantiesSupplementairesSouscrites:
        queryBody.GarantiesSupplementairesSouscrites,
      QuestionnaireMedical: queryBody.QuestionnaireMedical,
      CodeApporteur: apporteurBureau,
      Devise: filiale.devise,
    };

    const params = {
      ...currentProposition,
      DetailSimulation: JSON.stringify(currentProposition),
    };

    return await this.propositionAPI
      .saveCotation(params)
      .then((propositionRawData) => {
        if (propositionRawData.Success) {
          currentProposition.Observation = {
            Message: propositionRawData.Message,
            DateCreation: new Date(),
            StatutPaiement: false,
            NumeroProposition:
              propositionRawData.PropositionCreatedView.NumeroProposition,
            NumeroPolice:
              propositionRawData.PropositionCreatedView.NumeroPolice,
            PropositionStatus: propositionRawData.Status,
          };
          this.updateLocalStoragePropositions(currentProposition);
          return {
            status: propositionRawData.Success,
            requestCode: propositionRawData.Status,
            numeroProposition:
              propositionRawData.PropositionCreatedView.NumeroProposition,
            numeroPolice:
              propositionRawData.PropositionCreatedView.NumeroPolice,
            message: propositionRawData.Message,
          };
        } else {
          return {
            status: propositionRawData.Success,
            requestCode: propositionRawData.Status,
            message: propositionRawData.Message,
          };
        }
      });
  }

  protected async validateCotation(queryBody: any): Promise<any> {
    return this.propositionAPI
      .validateProposition(queryBody)
      .then((resp) => resp);
  }

  protected async findPropositionByClientId(
    queryBody: any
  ): Promise<ICotation[] | boolean> {
    return this.propositionAPI.findProposition(queryBody).then((resp) => {
      if (resp.Success) {
        this.cotationNumber.next(resp.TotalCount);
        return this.createListCotation(resp.propositions);
      } else return false;
    });
  }

  private createListCotation(data: any): ICotation[] {
    let cotations: ICotation[] = [];
    for (const itemCotation of data)
      cotations.push(CotationFactory.build(itemCotation));
    return cotations;
  }

  private updateLocalStoragePropositions(proposition: IProposition) {
    const propositionStorage = this._session.storeValue(
      APP_STORAGE_KEY.PROPOSITIONS
    );
    propositionStorage.push(proposition);
    this._session.dispatch(APP_STORAGE_KEY.PROPOSITIONS, propositionStorage);
    this.refreshLocalPropositionStorage();
  }

  protected refreshLocalPropositionStorage(): IProposition[] {
    const propositions: IProposition[] = [];
    const storagePropositions = this._session.storeValue(
      APP_STORAGE_KEY.PROPOSITIONS
    );
    for (const proposition of storagePropositions) {
      propositions.push(proposition);
    }
    this.propositionBehaviorSubject.next(propositions);
    return propositions;
  }

  protected getAllPropositions(): IProposition[] {
    return this.refreshLocalPropositionStorage();
  }

  protected updatePropositionByPropositionNumber(
    propositionNumber,
    newProposition: IProposition
  ): boolean {
    let updateStatus = false;
    const newPropositionList = this.propositionBehaviorSubject.value.filter(
      (itemProposition) => {
        // if (itemProposition.numeroProposition === propositionNumber){
        //   updateStatus = true;
        //   return newProposition;
        // } else { return itemProposition; }
      }
    );
    if (updateStatus) {
      this._session.dispatch(APP_STORAGE_KEY.PROPOSITIONS, newPropositionList);
      this.propositionBehaviorSubject.next(newPropositionList);
    }
    return updateStatus;
  }

  protected getPropositionByPropositionNumber(
    propositionNumber: string
  ): IProposition {
    const resultSearch: IProposition[] =
      this.propositionBehaviorSubject.value.filter((itemProposition) => {
        if (
          itemProposition.Observation.NumeroProposition === propositionNumber
        ) {
          return itemProposition;
        }
      });
    return resultSearch[0];
  }
}
