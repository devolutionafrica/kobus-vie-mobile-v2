import { IProduit } from './../../../../core/entities/Produit';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {
  APP_STORAGE_KEY,
  PROPOSITION_UNAUTHENTICATED_NUMBER,
} from 'src/app/config/config';
// import { IProduct } from 'src/app/core/entities/Produit';
import { StoreService } from 'src/app/providers/store.service';
import { AlertModal, alertIcon } from 'src/shared/tools/modal';
import { SessionService } from 'src/app/providers/session.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonIcon
  ]
})
export class ProductDetailComponent implements OnInit {
  @Input()
  produitData: IProduit;
  descriptionFilter:any
  description: any[] = [
    {
      CODE_PRODUIT: 1005,
      NOM: 'NSIA RETRAITE',
      TYPE: 'Contrat individuel d’épargne',
      OBJET: 'Le contrat NSIA RETRAITE a pour objet la constitution d’une épargne en vue de s’assurer une retraite complémentaire ou en vue de monter un projet quelconque à moyen ou long terme.',
      ADHERENTS: 'Toute personne physique âgée de 18 ans au moins et 50 ans au plus au moment de la souscription.',
      DUREE: 'Le contrat NSIA RETRAITE est souscrit en principe pour la durée résiduelle d’activité de l’assuré. Sa durée minimale est de 10 ans.',
      PAIEMENT: 'Les primes sont payables par prélèvement bancaire, chèque ou espèces au siège de la compagnie.',
      CAPITAUX_GARANTIS: "En cas de vie: versement de l’épargne constituée, nette de chargement, capitalisée au taux d’intérêt technique minimum annuel de 3,5 %, augmentée des participations au bénéfices (PB) e En cas de décès : versement de l’épargne constituée, nette de chargement, capitalisée au taux de 3.5% brut, majoré des participations aux bénéfices aux ayants droit Les Participations aux bénéfices sont distribuées à hauteur de 85% des résultats financiers et 90% des résultats techniques.",
      COTISATIONS: 'La prime minimale mensuelle est de 10 000 FCFA.',
      CESSATION_GARANTIES: 'Les garanties cessent : en cas de décès de l’assuré , au terme du contrat , en cas de résiliation du contrat',
      RACHAT: 'Le rachat peut être partiel ou total. Après une période de 24 mois de cotisation le contrat acquière une valeur de rachat qui permettra de prétendre à : Une avance ; possibilité de faire une avance à hauteur de 85% de la provision mathématique remboursable selon le taux d’intérêt fixé par l’assureur. Le rachat partiel correspond au versement d’une partie de la provision mathématique : il n’est pas remboursable. Le montant maximum accordé est égal à 85% de la valeur de rachat. En cas de rachat total, ce qui correspond à une résiliation totale, le capital acquis est frappé d’une pénalité. Cette pénalité est de 5 % si le rachat intervient avant les 10 premières années d’assurance. Pas de pénalité à partir de la dixième année.',
    },
    {
      CODE_PRODUIT: 1030, //3200,
      NOM: 'NSIA-ETUDES',
      TYPE: 'Contrat d’assurance individuel.',
      OBJET: 'En cas de vie de l’assuré au terme de la période de cotisation : Paiement d’une bourse annuelle destinée à assurer la scolarité d’un enfant. En cas de Décès ou en cas d’invalidité permanente totale de l’assuré avant le terme de la période de cotisation : Suspension des cotisations et paiement immédiat de la bourse annuelle jusqu’au terme du contrat (durée de cotisation restante + durée de service).',
      ADHERENTS: 'Toute personne physique âgée de 18 à 55 ans.',
      DUREE: 'Durée minimale de cotisation : la durée minimale de cotisation est de 10 ans. Toutefois au terme du contrat, l’assuré ne devra pas être âgé de plus de 65 ans. Durée de paiement de la bourse : la durée minimale de paiement de la bourse est de 3 ans. Durée du Contrat : La durée du contrat est la somme de la durée de cotisation et de la durée de paiement de la bourse. Ainsi le terme du contrat est la fin de la période de paiement de la bourse.',
      PAIEMENT: 'Les cotisations sont payables mensuellement, trimestriellement, semestriellement, annuellement ou en une fraction unique par prélèvement bancaire, espèce ou chèque. Modes chèque et espèce en paiement trimestriel exclusivement et à l’ordre de NSIA Vie.',
      CAPITAUX_GARANTIS: 'Au terme du contrat, 1. En cas de vie du parent souscripteur, NSIA verse le montant de la bourse annuelle pendant la durée de service souscrite. Toutefois, le parent souscripteur peut demander le reversement en capital. 2. En cas de décès, le montant de la bourse est reversé annuellement à l’enfant jusqu’au terme du contrat (durée de cotisation restante + durée de service)',
      COTISATIONS: 'La bourse annuelle minimale est de 500 000 FCFA. La durée de cotisation est au minimum fixée à 10 ans.',
      CESSATION_GARANTIES: 'La garantie décès et vie cessent dans les cas suivants : - au terme de la période de cotisation, en cas de non-paiement des primes, à la résiliation du contrat,au plus tard le 31 décembre de l’année du 65e anniversaire de l’adhérent.',
      RACHAT: 'Après deux années effectives de cotisation, l’assuré peut demander un rachat total de son contrat (résiliation de son contrat). Le rachat partiel n’est pas possible sur ce contrat',
    },
    {
      CODE_PRODUIT: 1028,
      NOM: 'NSIA-ETUDES',
      TYPE: 'Contrat d’assurance individuel.',
      OBJET: 'En cas de vie de l’assuré au terme de la période de cotisation : Paiement d’une bourse annuelle destinée à assurer la scolarité d’un enfant. En cas de Décès ou en cas d’invalidité permanente totale de l’assuré avant le terme de la période de cotisation : Suspension des cotisations et paiement immédiat de la bourse annuelle jusqu’au terme du contrat (durée de cotisation restante + durée de service).',
      ADHERENTS: 'Toute personne physique âgée de 18 à 55 ans.',
      DUREE: 'Durée minimale de cotisation : la durée minimale de cotisation est de 10 ans. Toutefois au terme du contrat, l’assuré ne devra pas être âgé de plus de 65 ans. Durée de paiement de la bourse : la durée minimale de paiement de la bourse est de 3 ans. Durée du Contrat : La durée du contrat est la somme de la durée de cotisation et de la durée de paiement de la bourse. Ainsi le terme du contrat est la fin de la période de paiement de la bourse.',
      PAIEMENT: 'Les cotisations sont payables mensuellement, trimestriellement, semestriellement, annuellement ou en une fraction unique par prélèvement bancaire, espèce ou chèque. Modes chèque et espèce en paiement trimestriel exclusivement et à l’ordre de NSIA Vie.',
      CAPITAUX_GARANTIS: 'Au terme du contrat, 1. En cas de vie du parent souscripteur, NSIA verse le montant de la bourse annuelle pendant la durée de service souscrite. Toutefois, le parent souscripteur peut demander le reversement en capital. 2. En cas de décès, le montant de la bourse est reversé annuellement à l’enfant jusqu’au terme du contrat (durée de cotisation restante + durée de service)',
      COTISATIONS: 'La bourse annuelle minimale est de 500 000 FCFA. La durée de cotisation est au minimum fixée à 10 ans.',
      CESSATION_GARANTIES: 'La garantie décès et vie cessent dans les cas suivants : - au terme de la période de cotisation, en cas de non-paiement des primes, à la résiliation du contrat,au plus tard le 31 décembre de l’année du 65e anniversaire de l’adhérent.',
      RACHAT: 'Après deux années effectives de cotisation, l’assuré peut demander un rachat total de son contrat (résiliation de son contrat). Le rachat partiel n’est pas possible sur ce contrat',
    },
    /*{
      CODE_PRODUIT: 1030,
      NOM: '',
      TYPE: '',
      OBJET: '',
      ADHERENTS: '',
      DUREE: '',
      PAIEMENT: '',
      CAPITAUX_GARANTIS: '',
      COTISATIONS: '',
      CESSATION_GARANTIES: '',
      RACHAT: '',
    }*/
  ];
  constructor(
    private route: Router,
    private _section: SessionService,
    public modalCtrl: ModalController
  ) {}

  subscribe = () => {
    const propositions = this._section.storeValue(APP_STORAGE_KEY.PROPOSITIONS);
    if (propositions?.length === PROPOSITION_UNAUTHENTICATED_NUMBER)
      AlertModal.show(
        '',
        'Vous ne pouvez plus créer de nouvelle proposition.',
        alertIcon.info
      );
    else {
      this.dismiss();
      this.route.navigate(['/subscribe', this.produitData.produitId]);
    }
  };

  dismiss = () => {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  };

  ngOnInit() {

        this.descriptionFilter = this.description.filter(item => item.CODE_PRODUIT === this.produitData.produitId)
  }
}
