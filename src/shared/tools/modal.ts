import { colors } from '../../app/config/color';
//import Swal from 'sweetalert2';
import {AlertController} from '@ionic/angular/standalone';

export enum alertIcon {
  info = 'info',
  error = 'error',
  success = 'success',
  warning = 'warning',
  question = 'question',
}

export enum inputType {
  url = 'url',
  file = 'file',
  text = 'text',
  radio = 'radio',
  email = 'email',
  range = 'range',
  select = 'select',
  password = 'password',
  textarea = 'textarea',
  checkbox = 'checkbox',
}

export interface AlertButtomText {
  cancel?: string;
  confirm?: string;
}

export class AlertModal {
  private static alertController: AlertController;
  public static show(title?: string, text?: string, alertIcon?: alertIcon, showConfirmBtn?: false|true, confirmBtnText?: string){
    return this.alertController.create({
      header: title,
      message: text,
      cssClass: 'alert-modal',
      buttons: [
        {
          text: confirmBtnText || 'OK',
        }
      ],
      backdropDismiss: false,
      animated: true
    }).then(alert => {
      alert.present();
      return alert.onDidDismiss();
    });   
  }
}

export class QuestionAlertModal {
  private static alertController: AlertController;
  public static show(title?: string, text?: string, alertIcon?: alertIcon, btnText?: AlertButtomText){
    return this.alertController.create({
      header: title,
      message: text,
      buttons: [
        {
          text: btnText.cancel || 'NON',
          role: 'cancel'
        },
        {
          text: btnText.confirm || 'OUI',
          role: 'confirm'
        }
      ],
      backdropDismiss: false,
      animated: true,
    }).then(alert => {
      alert.present();
      return alert.onDidDismiss();
    }); 
  }
}

export class InputAlertModal {
  private static alertController: AlertController;
  public static show(input?: inputType, title?: string, inputLabel?: string, value?: string, btnText?: AlertButtomText){
    return this.alertController.create({
      header: title,
      inputs: [
        {
          name: 'input',
          type: (input || inputType.text) as 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'date' | 'month' | 'time' | 'week' | 'textarea' | 'checkbox' | 'radio',
          placeholder: inputLabel || '',
          value: value || ''
        }
      ],
      buttons: [
        {
          text: btnText.cancel || 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: btnText.confirm || 'OK',
          handler: (data) => {
            console.log('Confirm clicked', data);
            return data.input; // Return the input value
          }
        }
      ],
      backdropDismiss: false,
      animated: true,
      cssClass: 'input-alert-modal'
    }).then(alert => {
      alert.present();
      return alert.onDidDismiss().then((result) => {
        if (result.role === 'cancel') {
          return null; // User cancelled the input
        } else {
          return result.data.values.input; // Return the input value
        }
      });
    });
  }
  
}

export class LoadingModal {
  private static alertController: AlertController;
  public static present(title?: string, text?: string, callback?: Function){
    return this.alertController.create({
      header: title || 'Loading',
      message: text || 'Please wait...',
      backdropDismiss: false,
      animated: true,
      buttons: []
    }).then(alert => {
      alert.present();
      if (callback && typeof callback === 'function') {
        callback();
      }
      return alert.onDidDismiss();
    });
  }
}
