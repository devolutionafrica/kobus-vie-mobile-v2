import { BehaviorSubject } from 'rxjs';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { SessionService } from 'src/app/providers/session.service';
import { IExtranetAdaptor } from '../adaptors/IExtranetAdaptor';
import { Authentification } from '../entities/Authentification';
import { UserAuthFactory } from '../factory/UserAuthFactory';
import { IExtranetAppConfigAdaptor } from '../adaptors/IExtranetConfigAdaptor';

export abstract class AuthentificationHandler {

  message = '';
  isAuth = false;
  authObject!: Authentification;
  authBehaviorSubject: BehaviorSubject<Authentification>;

  constructor(
    private _session: SessionService,
    private urlAPI: IExtranetAdaptor,private configUrlApi:IExtranetAppConfigAdaptor){
    this.authBehaviorSubject = new BehaviorSubject<Authentification>(this.authObject);
    }

  async signIn(queryBody: Object): Promise<boolean> {
    return await this.urlAPI.authUser(queryBody)
      .then(
        authBrutData => {
          if (authBrutData.Statut === 200) {
            this.createAuthInstance(authBrutData);
            this.updateBehaviorSubject();
            this.message = 'Operation success (^_^)';
            return true;
          } else {
            this.message = 'Login ou Mot de passe incorrect (!_!)';
            return false; }
        })
      .catch( error => {
          this.message = 'Erreur lors de la connexion avec la service (O_*)';
          return false; });
    }

    async codeApporteurVerification(queryBody: Object): Promise<boolean> {
      return await this.configUrlApi.verificationCodeApporteur(queryBody)
        .then(res => {
          if(res[0].CodeApporteur != null)
          {
            return true

          }else{
            return false
          }
          })
        .catch( error => {
            this.message = 'Erreur lors de la connexion avec la service (O_*)';
            return false; });
      }

  private createAuthInstance(jsonData: any) {
      this.authObject = UserAuthFactory.build(jsonData.InfoUser);
      this.authObject.isFirstConnexion = (jsonData.FirstConnect as number);
      this.isAuth = true;
    }

  private updateBehaviorSubject() {
      this.authBehaviorSubject.next(this.authObject);
    }

  protected isUserFirstConnexion(): boolean {
    const authJsonObject = this._session.storeValue(APP_STORAGE_KEY.AUTH);
    return authJsonObject.isFirstConnexion;
  }

  isConnected(): boolean{
    const authJsonObject = this._session.storeValue(APP_STORAGE_KEY.AUTH);
    if (authJsonObject !== null) { return true; }
    else { return false; }
  }

  logOut(){
    if (this.isAuth) {
      this.authBehaviorSubject.unsubscribe();
      this.message = 'Utilisateur bien deconnecté (^_^)';
      this.isAuth = false;
    } else { this.message = 'Vous devez vous connecté (!_!)' }
  }

  changUserPassword(queryBody: Object){
   return this.urlAPI.updateUserPassword(queryBody)
      .then(
        rawResp => {
          console.log('Coool :::> ', rawResp)
          return rawResp
        }
      )
      .catch(error => console.log('Error detected :::> ', error))
  }
}
