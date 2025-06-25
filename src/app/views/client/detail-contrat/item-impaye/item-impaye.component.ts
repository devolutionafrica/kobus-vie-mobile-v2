import { EtatQuittance } from './../../../../core/factory/ContratFullDetailFactory';
import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonRow, IonCol, IonText, IonCheckbox, IonIcon } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { IImpaye } from 'src/app/models/contrat.model';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { StoreService } from 'src/app/providers/store.service';
import { SessionService } from 'src/app/providers/session.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-item-impaye',
  templateUrl: './item-impaye.component.html',
  styleUrls: ['./item-impaye.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonRow,
    IonCol,
    IonText,
    IonCheckbox,
    IonIcon,
    TranslateModule
  ]
})

export class ItemImpayeComponent implements OnInit, OnChanges {

  @Input() data: IImpaye;
  @Input() selectInput: any;
  devise: string;
  selected: boolean;
  isPadding: boolean;
  backgroundStyle:string;
  @Output() childEvent = new EventEmitter();

  constructor(
    private store: StoreService,
    private session: SessionService,
    private translate: TranslateService
    ) {}

  ngOnChanges(change: SimpleChanges): void {
    const currentAction = change.selectInput.currentValue;
    if (currentAction.action !== 'None') {
      setTimeout(() => {
        this.data.selected = currentAction.value;
        this.remotChildEvent();
      }, 5);
    } else this.data.selected = false
  }

  ngOnInit() {
    this.isPadding = this.data.etatQuittance === EtatQuittance.PENDING_FOR_PROCESS ? true : false;
    this.backgroundStyle = this.isPadding ? 'item-impaye-pending' : 'item-impaye';
    this.devise = this.store.storeValue(APP_STORAGE_KEY.FILIALE).devise;
    const panierContent = this.session.storeValue('panier');
    if (panierContent) {
      this.session.storeValue('panier')
        .find(
          itemImpaye => {
            if (itemImpaye.numeroQuittance === this.data.numeroQuittance) this.data.selected = true;
          }
        );
    }
  }

  toggleSelect(){
    this.data.selected = !this.data.selected;
    this.remotChildEvent();
  }

  remotChildEvent() {
    const data = { action: this.data.selected ? 'ADD' : 'REMOVE', value: this.data };
    this.childEvent.emit(data);
  }

}
