import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APP_STORAGE_KEY } from '../config/config';


@Injectable({
    providedIn: 'root'
})
export class StoreService {

    public storeSubject:BehaviorSubject<Object>

    constructor(){
      if(!localStorage.chapChapStorage)
          localStorage.setItem(APP_STORAGE_KEY.APP_GLOBAL_STORAGE, JSON.stringify({}))
      this.storeSubject = new BehaviorSubject<Object>(JSON.parse(localStorage.getItem(APP_STORAGE_KEY.APP_GLOBAL_STORAGE)))
    }

    public dispatch(key:string, value:Object) {
      let localStore = JSON.parse(localStorage.getItem(APP_STORAGE_KEY.APP_GLOBAL_STORAGE))
      localStore[key] = value
      this.storeSubject.next(localStore)
      localStorage.setItem(APP_STORAGE_KEY.APP_GLOBAL_STORAGE, JSON.stringify(localStore))
    }

    public storeValue(key:string) {
      const localStore = this.storeSubject.value
      return localStore[key]
    }
}
