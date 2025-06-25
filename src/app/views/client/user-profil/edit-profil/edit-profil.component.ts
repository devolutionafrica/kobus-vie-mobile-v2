import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { EditProfilClientService } from 'src/app/core/usercases/EditProfilClient.Service';
import { SessionService } from 'src/app/providers/session.service';
import { Tools } from 'src/shared/tools/utils';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss'],
})
export class EditProfilComponent implements OnInit {
  userProfil:any
  userProfilForm:FormGroup
  constructor(
    private loadingCtrl:LoadingController,
    private extranetAPI:EditProfilClientService,
    private _session:SessionService) { }

  initForm(){
    const date = new Date(this.userProfil.dateNaissance)
    this.userProfilForm = new FormGroup({
      'nom': new FormControl(this.userProfil.nom, [Validators.required]),
      'prenom': new FormControl(this.userProfil.prenom, [Validators.required]),
      'dateNaiss': new FormControl(Tools.getDateFr(date), [Validators.required]),
      'lieuNaiss': new FormControl(this.userProfil.lieuNaissance, [Validators.required]),
      'telephone': new FormControl(this.userProfil.telephone, [Validators.required]),
      'telephone1': new FormControl(this.userProfil.telephone1, [Validators.required]),
      'nationalite': new FormControl(this.userProfil.nationalite, [Validators.required]),
      'adressPostal': new FormControl(this.userProfil.adressePostal, [Validators.required]),
      'adressEmail': new FormControl(this.userProfil.email, [Validators.required]),
      'profession': new FormControl(this.userProfil.profession, [Validators.required]),
      'situationMatri': new FormControl(this.userProfil.situationMatrimoniale, [Validators.required]),
    })
  }

  public get nom(){ return this.userProfilForm.get('nom') }
  public get prenom(){ return this.userProfilForm.get('prenom') }
  public get dateNaiss(){ return this.userProfilForm.get('dateNaiss') }
  public get lieuNaiss(){ return this.userProfilForm.get('lieuNaiss') }
  public get telephone(){ return this.userProfilForm.get('telephone') }
  public get telephone1(){ return this.userProfilForm.get('telephone1') }
  public get adressPostal(){ return this.userProfilForm.get('adressPostal') }
  public get adressEmail(){ return this.userProfilForm.get('adressEmail') }
  public get nationalite(){ return this.userProfilForm.get('nationalite') }
  public get situationMatri(){ return this.userProfilForm.get('situationMatri') }
  public get profession(){ return this.userProfilForm.get('profession') }

  ngOnInit() {
    this.userProfil = this._session.storeValue(APP_STORAGE_KEY.CURRENT_USER)
    this.initForm()
  }

  async updateUserProfil(){
    const currentData = this.userProfilForm.value
    const userData = {
      NUMERO_CLIENT: this.userProfil.nuClient,
      PROFESSION: currentData.profession,
      NOM_CLIENT: currentData.nom,
      PRENOMS_CLIENT: currentData.prenom,
      DATE_NAISSANCE: currentData.dateNaiss,
      LIEU_NAISSANCE: currentData.lieuNaiss,
      ADRESSE_POSTALE: currentData.adressPostal,
      NATIONALITE: currentData.nationalite,
      SITUATION_MATRIMONIALE: currentData.situationMatri,
      TELEPHONE: currentData.telephone,
      TELEPHONE_1: currentData.telephone1,
      EMAIL: currentData.adressEmail,
      CODE_FILIALE: this.userProfil.codeFiliale,
      PHOTO_UTILISATEUR: this.userProfil.photoUtilisateur
    }

    const loading = await this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message: 'Mise à jour en cours',
      });
    await loading.present();

    this.extranetAPI.updateUserProfil(userData)
      .then(
        profilRawData => {
          let currentUserProfil = profilRawData.toJson()
          currentUserProfil.dateCreation = this.userProfil.dateCreation
          this._session.dispatch(APP_STORAGE_KEY.CURRENT_USER, currentUserProfil)
          loading.dismiss()
        }
      )
  }

}
