import { BehaviorSubject } from 'rxjs';
import { APP_SESSION_KEY } from 'src/app/config/config';
import { SessionService } from 'src/app/providers/session.service';
import { EtatQuittance } from '../factory/ContratFullDetailFactory';

export abstract class PanierHandler {

  panierBehaviorSubject: BehaviorSubject<any[]>;

  constructor(private session: SessionService){
      if (this.session.storeValue(APP_SESSION_KEY.PANIER) === undefined)
        this.session.dispatch(APP_SESSION_KEY.PANIER, []);
      this.panierBehaviorSubject = new BehaviorSubject<any[]>(this.session.storeValue(APP_SESSION_KEY.PANIER));
    }

  protected addPrime(data: any){
      const searchImpaye = this.searchImpaye(data);
      if (searchImpaye.length === 0 && data.etatQuittance === EtatQuittance.IMPAYE) {
        this.panierBehaviorSubject.next([...this.panierBehaviorSubject.value, data]);
      }
      this.session.dispatch(APP_SESSION_KEY.PANIER, this.panierBehaviorSubject.value);
    }

  protected cleanPanier(){
    this.panierBehaviorSubject.next([]);
    this.session.dispatch(APP_SESSION_KEY.PANIER, this.panierBehaviorSubject.value);
  }

  protected removePrime(data: any){
      const newList = this.panierBehaviorSubject.value
        .filter(
          item => {
            if (data.numeroQuittance !== item.numeroQuittance) {
              return item;
            }
          }
        );
      this.panierBehaviorSubject.next(newList);
      this.session.dispatch(APP_SESSION_KEY.PANIER, this.panierBehaviorSubject.value);
    }

  private searchImpaye(data: any){
      return this.panierBehaviorSubject.value
        .filter(
          itemImpay => {
            if (itemImpay.numeroQuittance === data.numeroQuittance) {
              return itemImpay;
            }
          }
        );
    }
}
