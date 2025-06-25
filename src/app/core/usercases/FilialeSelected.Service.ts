import { APP_STORAGE_KEY } from 'src/app/config/config';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StoreService } from 'src/app/providers/store.service';
import { IFiliale } from '../entities/Filiale';
import { FilialeIcon } from 'src/app/config/filialeFlag';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class FilialeSelectedService {
  filialesSubject: BehaviorSubject<IFiliale>;

  constructor(private store: StoreService){
    let filiale: IFiliale;
    if ( store.storeValue(APP_STORAGE_KEY.FILIALE) !== null) {  filiale = this.store.storeValue(APP_STORAGE_KEY.FILIALE) }
    else {
      filiale = null;
      this.store.dispatch(APP_STORAGE_KEY.FILIALE, filiale);
    }
    this.filialesSubject = new BehaviorSubject<IFiliale>(filiale);
  }

  get(): IFiliale { return this.filialesSubject.value; }
  
  setFiliale(filiale: IFiliale){
    this.filialesSubject.next(filiale);
    this.store.dispatch(APP_STORAGE_KEY.FILIALE, filiale);
  }

  clean(){this.filialesSubject.next(null);}

}
