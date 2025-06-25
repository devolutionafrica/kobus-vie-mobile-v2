import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';

import { NgxSpinnerService } from 'ngx-spinner';

import { OperateurMobileService } from './../../../../core/usercases/OperatorList.Service';
import { ContratClientService } from './../../../../core/usercases/ContratClient.Service';
import { AuthentificationService } from 'src/app/core/usercases/Authentification.Service';
import { EditProfilClientService } from 'src/app/core/usercases/EditProfilClient.Service';
import { StoreService } from 'src/app/providers/store.service';
import { alertIcon, AlertModal } from 'src/shared/tools/modal';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { KobusClientUniqueService } from 'src/app/core/usercases/KobusClientUnique.Service';
import { SessionService } from 'src/app/providers/session.service';
import { Router } from '@angular/router';
import { Client } from 'src/app/core/entities/Client';
import { IClientUniqueContrats } from 'src/app/models/contrat.model';
import { Tools } from 'src/shared/tools/utils';
import { SpinnerConfigService } from 'src/shared/tools/spinner-config.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  constructor(
    private _route: Router,
    private store: StoreService,
    private _session: SessionService,
    private spinner: NgxSpinnerService,
    private _configSpinner: SpinnerConfigService,
    private contratService: ContratClientService,
    private loadingController: LoadingController,
    private editProfilService: EditProfilClientService,
    private authClientService: AuthentificationService,
    private mobilOperatorService: OperateurMobileService,
    private _clientUniqueService: KobusClientUniqueService,
    private ctrlModal: ModalController) { }

  ngOnInit() {
    this.initForm();
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('SignInComponent Destroy process');
  }

  initForm = (): void => {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  public get username(){ return this.loginForm.get('username'); }
  public get password(){ return this.loginForm.get('password'); }

  async loadingProcess() {
    this.spinner.show();
    this._configSpinner.setMessage("Connexion en cours")
    const authQueryBody = {username: this.username.value, password: this.password.value};
    this.authClientService.auth(authQueryBody)
      .then(
        authStatus => {
          if ( authStatus ) {
            const authUser = this.authClientService.authObject.toJson();
            const { codeFiliale, clientNumber } = authUser;
            const profilQueryBody = { Filliale: codeFiliale, NumeroClient: clientNumber };
            console.log(1)
            this._configSpinner.setMessage("Chargement de vos données personnelles")
            console.log(2)
            this.editProfilService.loadUserProfil(profilQueryBody)
              .then(
                (queryResponse: Client) => {
                  console.log(3)
                  this._clientUniqueService.getUniqueClientContrats(clientNumber)
                    .then(
                      result => {
                        console.log(4)
                        if(result.status) {
                          console.log(5)
                          this.spinner.hide()
                          const currentUser = queryResponse.toJson();
                          const contrats = result.data as IClientUniqueContrats;
                          if (contrats.data.length === 0)
                            AlertModal.show(
                              'Accès non autorisé',
                              'Rapproché vous de votre assurance pour plus de detail', alertIcon.info, false);
                          else {
                            console.log(6)
                            currentUser.dateCreation = Tools.getMinDateInContratArray(contrats.data).toDateString();
                            this._session.dispatch(APP_STORAGE_KEY.CURRENT_USER, currentUser);
                            this._session.dispatch(APP_STORAGE_KEY.CONTRATS, contrats);
                            this._session.dispatch(APP_STORAGE_KEY.AUTH, authUser);

                            if (authUser.isFirstConnexion)
                              this.spinner.hide()
                                .then(()=> {
                                  AlertModal.show(
                                    `Bienvenue ${currentUser.nom} ${currentUser.prenom}`,
                                    'Nous vous prions de modifier votre mot de passe par defaut', alertIcon.warning, true, 'Modifier Maintenant')
                                    .then(
                                      respModal => {
                                        this._session.dispatch(APP_STORAGE_KEY.CURRENT_ACCES, authQueryBody);
                                        this.ctrlModal.dismiss()
                                      }
                                    );
                                })
                            else  this.spinner.hide()
                                .then(resp => {
                                  AlertModal.show(
                                  `Bienvenue ${currentUser.nom} ${currentUser.prenom}`,
                                  'Nous sommes heureux de vous revoir', alertIcon.success, true, 'Continuer');
                                  this.ctrlModal.dismiss();
                                })
                          }
                        } else this.spinner.hide()
                              .then(resp => {
                                AlertModal.show(
                                  'Erreur de connexion',
                                  'Nous avons rencontré un problème lors de la connexion avec le serveur', alertIcon.error, false);
                              })
                      }
                    )
                }
              )
          } else this.spinner.hide()
            .then(()=> AlertModal.show(
              'Erreur de connexion',
              'Nom d\'utilisateur ou mot de passe incorrect', alertIcon.error, false))
        }
      )
      .catch(error => {
        this.spinner.hide()
        AlertModal.show(
          'Erreur de Serveur',
          'Nous avons rencontré un problème lors de la connexion avec le serveur', alertIcon.error, false);
      })
  }

  onAuthentify = () => {
    this.loadingProcess();
  }

  onCloseModal = () => {
    this.ctrlModal.dismiss();
  }

}
