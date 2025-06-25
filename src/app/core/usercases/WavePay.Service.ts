import { Injectable } from '@angular/core';
import { WAVE_PAY_API } from 'src/app/repository/WAVE_PAY_API';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class WavePayService {

  constructor(private extranetAPI: WAVE_PAY_API){
      
    }

  intentPay(queryBody): Promise<any> {
      return this.extranetAPI.intentPay(queryBody);
    }

  verifyPaymentStatus(queryBody): Promise<any> {
      return this.extranetAPI.verifyPaymentStatus(queryBody);
    }
}
