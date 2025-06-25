import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { IPrestation } from 'src/app/models/contrat.model';
import { StoreService } from 'src/app/providers/store.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-item-prestation',
  templateUrl: './item-prestation.component.html',
  styleUrls: ['./item-prestation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonIcon,
    TranslateModule
  ]
})
export class ItemPrestationComponent implements OnInit {
  @Input() data: IPrestation;
  devise: string = "";

  constructor(private translate: TranslateService, private store: StoreService) { }

  ngOnInit() {
    this.devise = this.store.storeValue(APP_STORAGE_KEY.FILIALE).devise;
  }
}
