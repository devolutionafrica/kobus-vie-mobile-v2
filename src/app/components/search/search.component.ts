import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter } from '@angular/core';
  import {IonSearchbar} from '@ionic/angular/standalone'

@Component({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports:[IonSearchbar]
})
export class SearchComponent implements OnInit {
  @Output() callback = new EventEmitter();
  @Input() placeholder: string;
  @Input() styleCss: string
  searchInput: string;

  constructor() { }

  ngOnInit() {
  }

  searchOnList($event){
    this.searchInput = $event.target.value.toUpperCase();
    this.callback.emit(this.searchInput);
  }

}
