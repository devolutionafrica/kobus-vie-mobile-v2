import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { SessionService } from 'src/app/providers/session.service';

@Component({
  selector: 'app-voir-profil',
  templateUrl: './voir-profil.component.html',
  styleUrls: ['./voir-profil.component.scss'],
})
export class VoirProfilComponent implements OnInit {

  userProfil:any
  constructor(
    private route:Router,
    private _session:SessionService) { }

  ngOnInit() {
    this.userProfil = this._session.storeValue(APP_STORAGE_KEY.CURRENT_USER)
    console.log(this.userProfil)
  }

  onEditProfil(){
    this.route.navigateByUrl('profil/edit')
  }

}
