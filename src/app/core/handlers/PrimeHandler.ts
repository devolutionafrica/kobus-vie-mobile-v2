import { IPrime } from './../entities/Prime';
import { PrimeFactory } from '../factory/PrimeFactory';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from 'src/app/providers/session.service';
import { APP_SESSION_KEY } from 'src/app/config/config';
import { StoreService } from 'src/app/providers/store.service';
import { IExtranetAdaptor } from '../adaptors/IExtranetAdaptor';

export abstract class PrimeHandler {

  _primes: IPrime[] = [];
  primeBehaviorSubject: BehaviorSubject<any[]>;

  constructor(
    private urlAPI: IExtranetAdaptor,
    private session: SessionService){
      if (this.session.storeValue(APP_SESSION_KEY.PRIMES_IMPAYES) === undefined) {
          this.session.dispatch(APP_SESSION_KEY.PRIMES_IMPAYES, []);
      }
      this.primeBehaviorSubject = new BehaviorSubject<IPrime[]>(this.session.storeValue(APP_SESSION_KEY.PRIMES_IMPAYES));
    }

  loadPrimes(rawPrimes: []){
    for (const prime of rawPrimes) {
      this.createEndPushPrimeInstance(prime);
    }
  }

  async getAllPrimes(queryBody: object): Promise<IPrime[]|boolean> {
    return this.urlAPI.listImpayes(queryBody)
      .then(
        responses => {
          if (responses.Statut === 200) {
            responses.ListImpayesClient.length !== this._primes.length && this.generatPrimeList(responses.ListImpayesClient);
            this.updateBehaviorSubject(this._primes);
            this.session.dispatch(APP_SESSION_KEY.PRIMES_IMPAYES, this._primes);
            return this._primes as IPrime[];
          } else { return false; }
        }
      );
  }

  updateBehaviorSubject(primes: IPrime[]){
    this.primeBehaviorSubject.next(primes);
  }

  getCurrentPrimes(): IPrime[]{
    return this._primes;
  }

  generatPrimeList(jsonData: any){
    for (const prime of jsonData) {
      this.createEndPushPrimeInstance(prime);
    }
  }

  createEndPushPrimeInstance(jsonData: any) {
    this._primes.push(PrimeFactory.build(jsonData));
  }
}
