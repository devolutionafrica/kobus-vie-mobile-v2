import { SouscriptionToolsService } from './../../../../core/usercases/SouscriptionTools.Service';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { IProduit } from 'src/app/core/entities/Produit';
import { ProductDetailComponent } from '../../product-list/product-detail/product-detail.component';
import { SessionService } from 'src/app/providers/session.service';
import { AlertModal, alertIcon } from 'src/shared/tools/modal';
import { CommonModule } from '@angular/common';
import { IonGrid, IonRow, IonCol, IonSkeletonText } from '@ionic/angular/standalone';

// Import your product dashboard item and alert components
import { ProductDashboardItemComponent } from '../product-dashboard-item/product-dashboard-item.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';

// Register Swiper custom elements (if not already done globally)
//import { register } from 'swiper/element/bundle';
//register();

@Component({
  selector: 'app-carrousel-product',
  templateUrl: './carrousel-product.component.html',
  styleUrls: ['./carrousel-product.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    CommonModule,
    IonGrid,
    IonRow,
    IonCol,
    IonSkeletonText,
    //ProductDetailComponent,
    ProductDashboardItemComponent,
    AlertComponent
  ],
})
export class CarrouselProductComponent implements OnInit {
  productList: IProduit[];
  isLoading: boolean;
 // @ViewChild('slideWithNav3', { static: false }) slideWithNav3: IonSlides;
  sliderThree: any;
  slideOptsThree = {
    autoplay: true,
    initialSlide: 0,
    spaceBetween: 5,
    slidesPerView: 2,
  };
  
  canSubscribe: boolean;
  userData;
  constructor(
    private souscriptionSubject: SouscriptionToolsService,
    private modalCtrl: ModalController,
    private _session: SessionService
  ) {}

  ngOnInit() {
    this.AgeVerification();
    this.souscriptionSubject.souscriptionSubject.subscribe((resp) => {
      if (resp.length > 0 || resp.length == 0) this.isLoading = true;
      else this.isLoading = false;
      this.productList = resp;
      this.sliderThree = {
        isBeginningSlide: true,
        slidesItems: this.productList,
      };
    });
  }
  AgeVerification() {
    this.userData = this._session.storeValue(APP_STORAGE_KEY.CURRENT_USER);
    const dateActuelle = new Date();
    let anneeNaiss = new Date(this.userData.dateNaissance).getFullYear();
    const anneeActuelle = dateActuelle.getFullYear();
    const age = anneeActuelle - anneeNaiss;
    if (age >= 18) {
      this.canSubscribe = true;
    } else {
      this.canSubscribe = false;
    }
  }
  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }

  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

  async checkProductDetail(codeProduit: number) {
    if (this.canSubscribe == true) {
      const prData = this.souscriptionSubject.searchProduitById(codeProduit);
      const modal = await this.modalCtrl.create({
        cssClass: 'produit-modal-style',
        component: ProductDetailComponent,
        presentingElement: await this.modalCtrl.getTop(),
        componentProps: {
          produitData: prData,
        },
      });
      return await modal.present();
    } else if (this.canSubscribe == false && codeProduit == 1025) {
      AlertModal.show(
        'Souscription non disponible',
        "L'age minimum pour souscrire à ce produit est de 18 ans.",
        alertIcon.error,
        false
      );
    }else{
      const prData = this.souscriptionSubject.searchProduitById(codeProduit);
      const modal = await this.modalCtrl.create({
        cssClass: 'produit-modal-style',
        component: ProductDetailComponent,
        presentingElement: await this.modalCtrl.getTop(),
        componentProps: {
          produitData: prData,
        },
      });
      return await modal.present();
    }
  }
}
