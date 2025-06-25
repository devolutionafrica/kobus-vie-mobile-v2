import { BehaviorSubject } from 'rxjs';
import { IExtranetAdaptor } from '../adaptors/IExtranetAdaptor';
import { ClientProfilFactory } from './../factory/ClientProfilFactory';
import { Client } from '../entities/Client';

export abstract class UtilisateurHandler {

  message = '';
  userObj!: Client;
  userBehaviorSubject: BehaviorSubject<Client>;

  constructor(private urlAPI: IExtranetAdaptor) {
    this.userBehaviorSubject = new BehaviorSubject<Client>(this.userObj);
  }

  async loadProfil(queryBody: Object): Promise<Client>{
      return await this.urlAPI.userProfil(queryBody)
        .then(
          profilRawData => {
            this.createUserInstance(profilRawData);
            this.updateBehaviorSubject();
            return this.userObj;
          }
        );
    }

  async updateProfil(queryBody: Object): Promise<Client>{
      return await this.urlAPI.updateUserProfil(queryBody)
        .then(
          profilRawData => {
            this.createUserInstance(profilRawData);
            this.updateBehaviorSubject();
            return this.userObj;
          }
        );
    }

  updateBehaviorSubject() {
      this.userBehaviorSubject.next(this.userObj);
    }

  createUserInstance(jsonData: any) {
      this.userObj = ClientProfilFactory.build(jsonData.InfoClient);
    }
}
