import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from 'src/app/providers/session.service';

@Component({
  selector: 'app-product-dashboard-item',
  templateUrl: './product-dashboard-item.component.html',
  styleUrls: ['./product-dashboard-item.component.scss'],
})
export class ProductDashboardItemComponent implements OnInit {
  @Input() data

  constructor(private session: SessionService,
    ) { }

  ngOnInit() {
  }


}
