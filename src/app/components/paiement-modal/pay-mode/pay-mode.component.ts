import {
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  Output,
  OnInit,
  Component,
  EventEmitter,
  OnDestroy,
 } from '@angular/core';
 import {NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common'

@Component({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-pay-mode',
  templateUrl: './pay-mode.component.html',
  styleUrls: ['./pay-mode.component.scss'],
  imports:[NgSwitch, NgSwitchCase, NgSwitchDefault]
})

export class PayModeComponent implements OnInit, OnDestroy {

  @Input() payData: any;
  @Output() eventOutup = new EventEmitter<any>();
  operator: string;
  constructor() { }

  ngOnDestroy() {
    console.log('destroy component')
  }

  ngOnInit() {
    this.getStyleCss();
  }

  getContratDetail = () => this.eventOutup.emit(this.payData);
  getStyleCss = () => this.operator = this.getOperatorAlias(this.payData._codeOperateur);

  getOperatorAlias(operator: any): string{
    const index = operator.indexOf(this.payData._codePays);
    if (index !== -1) {  return operator.substr(0, operator.length - 2); }
    else { return operator; }
  }

}
