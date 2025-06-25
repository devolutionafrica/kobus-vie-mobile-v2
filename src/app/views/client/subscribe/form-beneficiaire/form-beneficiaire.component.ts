import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IBeneficiaire } from 'src/app/core/entities/Beneficiaire';
import { ITypeBeneficiare } from 'src/app/core/entities/TypeBeneficiare';
import { BeneficiareService } from 'src/app/core/usercases/Beneficiaire.Service';

@Component({
  selector: 'app-form-beneficiaire',
  templateUrl: './form-beneficiaire.component.html',
  styleUrls: ['./form-beneficiaire.component.scss'],
})

export class FormBeneficiaireComponent implements OnInit, OnDestroy {
  @Input() beneficiaresType: ITypeBeneficiare[];

  formBenef: FormGroup;
  toggleFormBenef = true;
  repartitionRest: number;
  autresFormBenef: FormGroup;
  editItemBenef: IBeneficiaire;
  beneficiaires: IBeneficiaire[];
  beneficiaresList:ITypeBeneficiare[] = [
    {
      id: 'ConjointDefautEnfant',
      libelle: 'Conjoint a defaut les enfants',
      occurances: 1
    },
    {
      id: 'ConJoint_Conjointe',
      libelle: 'Le conjoint',
      occurances: 1
    },
    {
      id: 'Autre',
      libelle: 'Autres',
      occurances: 6
    },
    {
      id: 'EnfantsNesOuANaitre',
      libelle: 'Enfants nées ou à naitre',
      occurances: 6
    }
  ]

  constructor(
    private beneficiaireService: BeneficiareService,
    private toastCtl: ToastController){}

  @HostListener('unloaded')
  ngOnDestroy() {
    this.beneficiaireService.beneficiareBehaviorSubject.next([]);
    console.log('FormBeneficiaireComponent Destroy process');
  }

  ngOnInit() {
    this.initFormBasicBenef();
    this.initFormOverBenef();
    this.beneficiaireService.beneficiareBehaviorSubject
      .subscribe(
        beneficiers => {
          let using = 0;
          this.beneficiaires = beneficiers;
          this.beneficiaires.find(resp => { using += resp.Repartition; });
          this.repartitionRest = 100 - using > 0 ? 100 - using : 0;
      });

  }

  initFormBasicBenef = () => {
    this.formBenef = new FormGroup({
      'typeBeneficiaire': new FormControl('', [Validators.required]),
      'beneficierTitle': new FormControl(''),
      'tauxRepartition': new FormControl(0, [
        Validators.required,
        Validators.pattern(/^[1-9][0-9]*$/)
      ]),
    });
  }

  initFormOverBenef = () => {
    this.autresFormBenef = new FormGroup({
      'nom': new FormControl('', [Validators.required]),
      'prenom': new FormControl('', [Validators.required]),
      'dateNaissance': new FormControl('', [Validators.required]),
      'lieuNaissance': new FormControl('', [Validators.required]),
      'contact': new FormControl('', [Validators.required]),
    });
  }

  public get typeBeneficiaire() { return this.formBenef.get('typeBeneficiaire'); }
  public get tauxRepartition() { return this.formBenef.get('tauxRepartition'); }
  public get beneficierTitle() { return this.formBenef.get('beneficierTitle'); }

  public get nom() { return this.autresFormBenef.get('nom'); }
  public get prenom() { return this.autresFormBenef.get('prenom'); }
  public get lieuNaissance() { return this.autresFormBenef.get('lieuNaissance'); }
  public get dateNaissance() { return this.autresFormBenef.get('dateNaissance'); }
  public get contact() { return this.autresFormBenef.get('contact'); }

  onAddBenef = () => {
    if (parseInt(this.tauxRepartition.value) > 0 && this.repartitionRest >= 0 ){
      const beneficierId = this.typeBeneficiaire.value as string
      const result = this.searchTypeBeneficier(beneficierId)
      result && this.beneficierTitle.setValue(result.libelle as string)
      const rawDataBeneficiare = {
        ...this.formBenef.value,
        ...this.autresFormBenef.value,
      };
      const beneficiare = this.beneficiaireService.addBeneficiare(rawDataBeneficiare);
      if (!beneficiare) {
        this.typeBeneficiaire.value === 'Autre' ?
        this.presentToast(`${this.nom.value} ${this.prenom.value}`) :
        this.presentToast('Votre selection');
      }
    }

    this.initFormBasicBenef();
    this.initFormOverBenef();
    this.openForm();
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtl.create({
      message: `${msg} faire déjà partie de votre liste de bénéficiaire.`,
      position: 'top',
      duration: 5000,
      buttons: [
        {
          side: 'end',
          icon: 'close',
          handler: () => {}
        }
      ]
    });
    toast.present();
  }

  actionEditing = ($evnt) => {
    this.editItemBenef = $evnt;
  }

  openForm = () => this.toggleFormBenef = !this.toggleFormBenef;

  searchTypeBeneficier(beneficierId: string): any|boolean {
    const resultSearch = this.beneficiaresList
      .filter(itemBeneficier => itemBeneficier.id === beneficierId && itemBeneficier)
    return resultSearch.length > 0 ? resultSearch[0] : false
  }

}
