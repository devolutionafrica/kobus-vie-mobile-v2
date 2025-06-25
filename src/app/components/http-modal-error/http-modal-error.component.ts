import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NetworkListenerService } from 'src/shared/services/networkListener.service';
import { CommonModule } from '@angular/common';
import {IonContent,IonRow, IonCol, IonText, ModalController} from '@ionic/angular/standalone';
//import {AnimationItem} from 'lottie-web';
import {AnimationOptions,LottieComponent} from 'ngx-lottie'
@Component({
  selector: 'app-http-modal-error',
  templateUrl: './http-modal-error.component.html',
  styleUrls: ['./http-modal-error.component.scss'],
  providers: [NetworkListenerService],
  imports: [LottieComponent,CommonModule,IonContent,IonRow, IonCol, IonText],
})
export class HttpModalErrorComponent implements OnInit, OnDestroy {
  @Input() cb: Function;
  networkSubcribe: Subscription;
  intervalId: any;
  animationOptions : AnimationOptions = {
    path: '../../assets/lotties/lot_network_error.json',
    loop:  true,
    autoplay : true
  };
  constructor(
    private networkService: NetworkListenerService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.intervalId = this.networkService.checkNetworkStatus();
    this.networkService.networkStatusBehaviorSubject
      .subscribe(
        isConnected => {
          if (isConnected) this.modalCtrl.dismiss().then(resp => this.cb(false));
        }
      );
  }

  ngOnDestroy(): void {
    console.log('network modal has closed ');
    clearInterval(this.intervalId)
  }


}
