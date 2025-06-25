import { PlatformService } from './../../../shared/services/platform.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonTitle,IonIcon,  IonRow, IonCol} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonHeader,IonTitle, IonIcon,  IonRow, IonCol]
})
export class HeaderComponent implements OnInit {
  @Input() boxStyle:string
  @Input() iconSize:string
  @Input() iconName:string
  @Input() navigate:string
  @Input() iconColor:string
  @Input() headerTitle:string
  @Input() args?:string

  platformValue: string
  constructor(
    private platform: PlatformService,
    private route:Router) {
      this.platformValue = this.platform.getPlatform()
    }

  ngOnInit() {}

  onNavigate(){
    let path = ['']
    path = this.args === undefined ? [`${this.navigate}`]:[`${this.navigate}`, this.args]
    console.log('route link :::> ', path)
    this.route.navigate(path)
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    // console.log("HeaderComponent Destroy process")
  }


}
