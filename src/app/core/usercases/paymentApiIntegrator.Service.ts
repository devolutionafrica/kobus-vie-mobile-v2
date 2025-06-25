import { Injectable } from '@angular/core';
import { Hub2PayService } from './Hub2Pay.Service';
import { IxpertaPayService } from './IxpertaPay.Service';
import { WavePayService } from './WavePay.Service';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class PaymentApiIntegratorService {
  private instancePay: any;
  constructor(
    private hub2Service: Hub2PayService,
    private ixpertaService: IxpertaPayService,
    private waveService:WavePayService
  ) {}

  public async lunchPaymentIntent(
    integrator: Integrator,
    queryBody: any
  ): Promise<any> {
    switch (integrator) {
      case Integrator.HUB2:
        this.instancePay = this.hub2Service;
        break;
      case Integrator.IXPERTA_PAY:
        this.instancePay = this.ixpertaService;
        break;
      case Integrator.WAVE_PAY:
        this.instancePay = this.waveService;
        break;
    }
    return await this.instancePay.intentPay(queryBody);
  }

  public async lunchVerifyPaymentStatus(
    integrator: Integrator,
    queryBody: any
  ): Promise<any> {
    switch (integrator) {
      case Integrator.HUB2:
        this.instancePay = this.hub2Service;
        break;
      case Integrator.IXPERTA_PAY:
        this.instancePay = this.ixpertaService;
        break;
    }
    return await this.instancePay.verifyPaymentStatus(queryBody);
  }
}

export enum Integrator {
  HUB2 = 'hub2',
  IXPERTA_PAY = 'ixperta_pay',
  WAVE_PAY = 'Wave',
}
