import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonButton, IonIcon  } from '@ionic/angular/standalone';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

import { StoreService } from 'src/app/providers/store.service';
import { CGUService } from 'src/app/core/usercases/CGB.Service';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { IntegrateurService } from 'src/app/core/usercases/Integrateur.Service';
import { Router } from '@angular/router';

import { PlatformService } from 'src/shared/services/platform.service';
import { IIntegrateur } from './../../core/factory/IntegrateurFactory';
import { JsonCGU } from './../../core/entities/CGU';
import { AppInitConfigService } from 'src/app/core/usercases/AppInitConfig.Service';
import { appInfoData } from './../../../assets/data/pubStaticData';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-init-app',
  templateUrl: './init-app.page.html',
  styleUrls: ['./init-app.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [RouterLink, LottieComponent,IonContent, IonButton, IonIcon, CommonModule, FormsModule]
})
export class InitAppPage implements OnInit {
  sliderThree: any;
  sliderData = appInfoData;
  slideOptsThree = {
    autoplay: true,
    initialSlide: 0,
    spaceBetween: 1,
    slidesPerView: 1,
  };
  options: AnimationOptions = {
    path: '/assets/lotties/lot_validate.json',
    loop: true,
    autoplay: true,
  };
  waitingOptions: AnimationOptions = {
    autoplay : true,
    loop : true,
    path:"/assets/lotties/lot_loading.json",
  }
  completedOptions: AnimationOptions = {
    autoplay : true,
    loop : true,
    path:"/assets/lotties/lot_validate.json",
  }
  isConfig = false;
  platformValue: string;
  constructor(
    private store: StoreService,
    private cguService: CGUService,
    private platform: PlatformService,
    private integratorService: IntegrateurService,
    private router:Router,
    private appConfigService: AppInitConfigService
  ) { 
    this.platformValue = this.platform.getPlatform()
  }

  ngOnInit() {
    this.sliderThree = {
      isEndSlide: false,
      isBeginningSlide: true,
      slidesItems: this.sliderData
    }
    this.appConfigService.lunchInitProcess()
      .then(
        rawData => {
          this.cguService.loadCGU()
            .then(
              (cguResponse: JsonCGU[]) => {
                this.integratorService.getIntegrateurs()
                  .then(
                    integrators => {
                      const newAppConfig = {
                        cguContent: cguResponse,
                        ...rawData,
                        integrators: integrators as IIntegrateur[],
                        ...this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG)
                      };
                      this.appConfigService.currentAppConfigSubject.next(newAppConfig);
                      this.isConfig = true;
                    }
                  )
              }
            )
        }
      );
  }

}
