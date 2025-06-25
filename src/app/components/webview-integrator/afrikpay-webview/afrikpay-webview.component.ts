import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-afrikpay-webview',
  templateUrl: './afrikpay-webview.component.html',
  styleUrls: ['./afrikpay-webview.component.scss'],
})
export class AfrikpayWebviewComponent implements OnInit {
  @Input() webviewData: any;
  externalId: string = '';
  afrikpay_account_username: string = 'uname';
  host: string = 'https://developers.api.oss.afrikpay.com';
  paymentForm: FormGroup;
  randomLetter: string;

  constructor() {

    this.paymentForm = new FormGroup({
      referenceNumber: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(0)]),
      description: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      addressLine1: new FormControl(''),
      addressCity: new FormControl(''),
      addressState: new FormControl(''),
      addressPostalCode: new FormControl('')
    });
  }

  ngOnInit() {
    this.externalId = this.generateRandomString();
    console.log('renderPaymentBtns',typeof renderPaymentBtns)
    console.log('Exteral Id : '+this.externalId,this.afrikpay_account_username,this.host)
    this.loadAfrikPayPayment();
  }

  generateRandomString(): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';  // Lettres
    const digits = '0123456789';  // Chiffres

    let result = '';
    const length = 10; // Longueur de la chaîne souhaitée

    for (let i = 0; i < length; i++) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)]; // Lettre aléatoire
      const randomNumber = digits[Math.floor(Math.random() * digits.length)]; // Chiffre aléatoire

      // Alterner entre lettre et chiffre
      if (i % 2 === 0) {
        result += randomLetter; // Ajouter une lettre si l'index est pair
      } else {
        result += randomNumber; // Ajouter un chiffre si l'index est impair
      }
    }

    return result;
  }




  onSubmit(): void {
    if (this.paymentForm.valid) {
      console.log('Form Submitted', this.paymentForm.value);
      // Vous pouvez envoyer les données du formulaire à votre API ici

    } else {
      console.log('Form is not valid');
    }
  }

  loadAfrikPayPayment(): void {
    // Assurez-vous que le script est chargé avant d'appeler la fonction de paiement
    if (typeof renderPaymentBtns === 'function') {
      console.log('Appel de fonction 1 : loadAfrikPayPayment')
      renderPaymentBtns({
        externalId: this.externalId,
        username: this.afrikpay_account_username,
        formId: 'form_id',
        paymentUrl: `${this.host}/api/secure/form/ecommerce/checkout/payment`,
        btnsContainerId: 'buttons-container',
        btnClass: 'btn btn-primary ms-2 mt-2',
        btnInlineStyleClass: 'btn-style',
        methods: [
          'orange-money-ecommerce-payment-service-feature',
          'mtn-mobile-money-ecommerce-payment-service-feature',
        ]
      });
    }
  }
}
