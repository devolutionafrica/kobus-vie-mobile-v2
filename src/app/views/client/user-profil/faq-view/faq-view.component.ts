import { Component, OnInit } from '@angular/core';
import { FAQ } from 'src/assets/data/faq';

@Component({
  selector: 'app-faq-view',
  templateUrl: './faq-view.component.html',
  styleUrls: ['./faq-view.component.scss'],
})
export class FaqViewComponent implements OnInit {

  FaqData = FAQ
  constructor() { }
  ngOnInit() {}

}
