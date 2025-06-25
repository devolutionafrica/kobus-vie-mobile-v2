import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PlatformService {
  currentPlatform: string = ''
  constructor(
    private platform: Platform) { }

  getPlatform(): string{
    switch (true) {
      case this.platform.is('ios'):
      case this.platform.is('ipad'):
      case this.platform.is('iphone'):
        this.currentPlatform = 'ios'
        return this.currentPlatform
      case this.platform.is('android'):
        this.currentPlatform = 'android'
        return this.currentPlatform
    }
  }
}
