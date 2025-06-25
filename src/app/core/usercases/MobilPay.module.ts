import { KkaipayService } from './kkaipay.Service';
import { NgModule } from '@angular/core';
import { Hub2PayService } from './Hub2Pay.Service';
import { IxpertaPayService } from './IxpertaPay.Service';
import { PaymentApiIntegratorService } from './paymentApiIntegrator.Service';
import { WavePayService } from './WavePay.Service';

@NgModule({
  providers: [
    Hub2PayService,
    WavePayService,
    KkaipayService,
    IxpertaPayService,
    PaymentApiIntegratorService
  ]
})
export class MobilPayModule {}
