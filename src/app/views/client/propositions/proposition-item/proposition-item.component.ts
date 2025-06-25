import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-proposition-item',
  templateUrl: './proposition-item.component.html',
  styleUrls: ['./proposition-item.component.scss'],
})
export class PropositionItemComponent implements OnInit {
  @Input() data:any
  @Output() showModalEvent = new EventEmitter<string>()
  @Output() actionEvent = new EventEmitter<string>()

  constructor(){}

  ngOnInit() {}

  openModal(){
      this.showModalEvent.emit(this.data)
    }

}
