import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCol, IonRow, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCol,
    IonRow,
    IonIcon
  ]
})
export class DashboardCardComponent implements OnInit {
  @Input() label: string;
  @Input() icon: string;
  @Input() number: number;
  @Output() action = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  executeAction() {
    this.action.emit();
  }
}
