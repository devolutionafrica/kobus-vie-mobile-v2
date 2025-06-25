import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    public session: Observable<any>;
    public sessionSubject: BehaviorSubject<any>;

    constructor(){
        if (!sessionStorage.chapChapStorage) {
            sessionStorage.setItem('chapChapSession', JSON.stringify({}));
        }
        this.sessionSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('chapChapSession')));
        this.session = this.sessionSubject.asObservable();
    }

    public dispatch(key: string, value: any) {
      let localSession = JSON.parse(sessionStorage.getItem('chapChapSession'));
      localSession[key] = value;
      this.sessionSubject.next(localSession);
      sessionStorage.setItem('chapChapSession', JSON.stringify(localSession));
    }

    public storeValue(key: string) {
        const localSession = this.sessionSubject.value;
        return localSession[key];
    }

}
