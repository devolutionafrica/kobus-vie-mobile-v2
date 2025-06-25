import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent,  IonHeader, IonTitle, IonImg, IonText, IonItem, IonIcon, IonButton } from '@ionic/angular/standalone';
import { MatSelect } from '@angular/material/select';
import { MatOption,  } from '@angular/material/core';
import { RouterLink } from '@angular/router';

import { FilialeSelectedService } from './../../core/usercases/FilialeSelected.Service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { StoreService } from 'src/app/providers/store.service';
import { IFiliale, IFilialeJsonFormat } from 'src/app/core/entities/Filiale';
import { FilialeIcon } from 'src/app/config/filialeFlag';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { AppConfig, appConfigStep } from 'src/app/core/entities/AppConfig';
import { PlatformService } from 'src/shared/services/platform.service';


@Component({
  selector: 'app-config-country',
  templateUrl: './config-country.page.html',
  styleUrls: ['./config-country.page.scss'],
  standalone: true,
  imports:  [TranslateModule,MatSelect, MatOption,RouterLink, IonContent,  CommonModule, ReactiveFormsModule, IonImg, IonText, IonItem, IonIcon, IonButton]
})
export class ConfigCountryPage implements OnInit {
  filialeSelected: IFiliale;
  filialeGroup: FormGroup;
  filiales: IFiliale[] = [];
  storageFiliales: IFilialeJsonFormat[] = [];
  platformValue: string
  constructor(
    private store: StoreService,
    private platform: PlatformService,
    private filialeSelectedService: FilialeSelectedService,
  ) { 
    this.storageFiliales = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).filiales;
      this.platformValue = this.platform.getPlatform()
  }

  ngOnInit() {
    this.initForm();
    if (this.storageFiliales !== null) {
      this.storageFiliales.find(item => {
        const filialeItem = {
          filiale: item.libelle,
          fileDirPath: item.documentUrl,
          hostname: item.apiUrl,
          icon: FilialeIcon[item.codeFiliale],
          codeFiliale: item.codeFilialePaiement,
          devise: item.devise,
          souscriptionUrl: item.souscriptionUrl,
          ixpertaPayHostname: item.ixpertaPayHostname ,
          ixpertaPayApiKey: item.ixpertaPayApiKey
        };
        this.filiales.push(filialeItem);
      });
    }
  }
  ionViewWillEnter(): void {
    //this.translate.reloadSelected();
  }

  initForm = (): void => {
      this.filialeGroup = new FormGroup({
        'filialeName': new FormControl( this.filialeSelected ? this.filialeSelected.filiale : '' , [Validators.required])
      });
      
  }

  changeFiliale(e) {
    this.filialeName.setValue(e.value, { onlySelf: true });
    const selected = this.filialeName.value;
    this.filiales.filter(item => {
      //console.log(item);
        if (item.filiale === selected) {
          //console.log(item);
          this.filialeSelectedService.setFiliale(item);
          this.filialeSelected = item;
          const configStep = new AppConfig(false, appConfigStep.PROGRESS).json();
          this.store.dispatch(APP_STORAGE_KEY.CONFIG_STEP, configStep);
        }
      });
  }
  public get filialeName() { return this.filialeGroup.get('filialeName'); }

}
