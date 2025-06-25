import { IProposition } from 'src/app/core/entities/Propostion';
import { Injectable, OnDestroy } from '@angular/core';
import { StoreService } from 'src/app/providers/store.service';
import { PropositionHandler } from '../handlers/PropositionHandler';
import { EXTRANET_SOUSCRIPTION_API } from 'src/app/repository/EXTRANET_SOUSCRIPTION_API';
import { SessionService } from 'src/app/providers/session.service';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class PropositionService extends PropositionHandler implements OnDestroy{

  constructor(
    store: StoreService,
    session: SessionService,
    propositionAPI: EXTRANET_SOUSCRIPTION_API){
      super(store, session, propositionAPI);
    }

  ngOnDestroy(): void {
    console.log('destroy service instance #PropositionService');
  }

  saveProposition(queryBody: any): Promise<any>{
      return this.createContrat(queryBody);
    }

  savePropositionByFile(queryBody: any): Promise<any>{
    return this.createContrat(queryBody);
    }

  saveNewCotation(queryBody: any): Promise<any>{
      return this.saveCotation(queryBody)
    }

  validationCatation(queryBody: any): Promise<any>{
    return this.validateCotation(queryBody)
  }

  getProposition(propositionNumber: string): IProposition|boolean {
      return this.getPropositionByPropositionNumber(propositionNumber);
    }

  loadPropositions(): IProposition[]{
    return this.getAllPropositions();
    }

  refreshData(){
    this.refreshLocalPropositionStorage();
    }

  findAllProposition(queryBody: any): Promise<any> {
      return this.findPropositionByClientId(queryBody)
    }

  /** Methode à retirer */
  updatePropositionByNumber(propositionNumber: string, proposition: IProposition): boolean {
    return this.updatePropositionByPropositionNumber(propositionNumber, proposition);
    }
}
