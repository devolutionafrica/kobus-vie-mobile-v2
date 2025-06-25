import { EXTRANET_CLIENT_API } from 'src/app/repository/EXTRANET_CLIENT_API';
import { SessionService } from './../../providers/session.service';
import { PrimeHandler } from '../handlers/PrimeHandler';
import { Injectable } from '@angular/core';
import { IPrime } from '../entities/Prime';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class PrimeService extends PrimeHandler {

  constructor(
    private sessionService: SessionService,
    private apiHost: EXTRANET_CLIENT_API
  ){
    super(apiHost, sessionService);
  }

  setPrimes(rawPrime: []){
    this.loadPrimes(rawPrime);
  }

  getPrimes(): IPrime[]{
    return this.getCurrentPrimes();
  }
}
