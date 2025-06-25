import { FormControl, FormGroup, Validators } from "@angular/forms"

export class FormProductBase {

  constructor(
    private _capitalSouscrire?:number,
    private _dateCloture?:string,
    private _dureeContrat?:number,
    private _dateEffet?:string,
    private _dateNaiss?:string,
    private _fractionnement?:number,
  ){}

  public getControlForm() {
    return {
      "capitalSouscrire": new FormControl(this._capitalSouscrire, [Validators.required]),
      "dateCloture": new FormControl(this._dateCloture, [Validators.required]),
      "dureeContrat": new FormControl(this._dureeContrat, [Validators.required]),
      "dateEffet": new FormControl(this._dateEffet, [Validators.required]),
      "dateNaiss": new FormControl(this._dateNaiss, [Validators.required]),
      "fractionnement": new FormControl(this._fractionnement, [Validators.required])
    }
  }

  public buildForm():FormGroup{
    return new FormGroup(this.getControlForm())
  }
}

export class FormProductSimple extends FormProductBase {
  constructor(
    private capitalSouscrire?:number,
    private dateCloture?:string,
    private dureeContrat?:number,
    private dateEffet?:string,
    private dateNaiss?:string,
    private fractionnement?:number,
  ){
    super(
      capitalSouscrire,
      dateCloture,
      dureeContrat,
      dateEffet,
      dateNaiss,
      fractionnement,)
  }

  public buildForm(){
    return new FormGroup({
      ...this.getControlForm()
    })
  }
}

export  class FormProductRente extends FormProductBase{

  constructor(
    private capitalSouscrire?:number,
    private dateCloture?:string,
    private dureeContrat?:number,
    private dateEffet?:string,
    private dateNaiss?:string,
    private fractionnement?:number,
    private _dureeRente?:number
  ){
    super(
      capitalSouscrire,
      dateCloture,
      dureeContrat,
      dateEffet,
      dateNaiss,
      fractionnement)
  }

  public buildForm(){
    let formControls = this.getControlForm()
    return new FormGroup({
      "dureeRente": new FormControl(this._dureeRente, [Validators.required, Validators.pattern(/^[0-9 - _]*$/)]),
      ...formControls
    })
  }
}

export  class SouscripteurForm {
  constructor(
    private _nom?:number,
    private _prenom?:string,
    private _contact?:number,
    private _sexe?:string,
    private _lieuNaiss?:string,
    private _adressEmail?:string
  ){}

  public buildForm():FormGroup{
    return new FormGroup({
      "nom": new FormControl(this._nom, [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z- 'éèàâôç]*$/)]),
      "prenom": new FormControl(this._prenom, [
        Validators.required,
        Validators.maxLength(70),
        Validators.pattern(/^[a-zA-Z- 'éèàâôç]*$/)
      ]),
      "contact": new FormControl(this._contact, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.pattern(/^[0-9 - _]*$/)
      ]),
      "sexe": new FormControl(this._sexe, [
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern(/^[a-zA-Z)]*$/)
      ]),
      "lieuNaiss": new FormControl(this._lieuNaiss, [
        Validators.required,
        Validators.maxLength(120),
        Validators.pattern(/^[a-zA-Z- _'éèàâôç 0-9 ()]*$/)
      ]),
      "adressEmail": new FormControl(this._adressEmail, [
        Validators.required,
        Validators.maxLength(120),
        Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ])
    })
  }
}

export class FormRecupAccount {

  constructor(
    private _nuPolice?:string,
    private _adressEmail?:string,
  ){}

  public buildForm ():FormGroup {
    return new FormGroup({
      "nuPolice": new FormControl(
        this._nuPolice,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]*$/)
        ]),
      "adressMail": new FormControl(
        this._adressEmail,
        [
          Validators.required,
          Validators.maxLength(120),
          Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ]),
    })
  }
}

export class FormInitSubscribeProposition {
  constructor(
    private _nom?:number,
    private _prenom?:string,
    private _contact?:number,
    private _adressEmail?:string
  ){}

  public buildForm():FormGroup{
    return new FormGroup({
      "nom": new FormControl(this._nom, [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z- 'éèàâôç]*$/)]),
      "prenom": new FormControl(this._prenom, [
        Validators.required,
        Validators.maxLength(70),
        Validators.pattern(/^[a-zA-Z- 'éèàâôç]*$/)
      ]),
      "contact": new FormControl(this._contact, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.pattern(/^[0-9 - _]*$/)
      ]),
      "adressEmail": new FormControl(this._adressEmail, [
        Validators.required,
        Validators.maxLength(120),
        Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ])
    })
  }
}

export class FormPieceJointe {
  constructor(
    private _typePiece?:string,
    private _userPhoto?:number,
    private _pieceJointeRecto?:string,
    private _pieceJointeVerso?:number,
  ){}

  public buildForm():FormGroup{
    return new FormGroup({
      "typePiece": new FormControl(this._typePiece, [
        Validators.required]),
      "userPhoto": new FormControl(this._userPhoto),
      "pieceJointeRecto": new FormControl(this._pieceJointeRecto),
      "pieceJointeVerso": new FormControl(this._pieceJointeVerso)
    });
  }
}

export class FormUpdateUserPassword {
  constructor(
    private _contacte?: string,
    private _emailAdress?: string,
    private _lastPassword?:string,
    private _newPassword?:string
  ){}

  public buildForm():FormGroup{
    return new FormGroup({
      "contact": new FormControl(this._contacte,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern(/^[0-9 - _]*$/)
        ]),
      "emailAdress": new FormControl(this._emailAdress,
        [
          Validators.required,
          Validators.maxLength(120),
          Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ]),
      "lastPassword": new FormControl(this._lastPassword,
        [
          Validators.required,
          Validators.minLength(5),
        ]),
      "newPassword": new FormControl(this._newPassword,[Validators.required])
    })
  }
}


export class PayForm {
  constructor(private _phone: string){}
  public getControlForm() {
    return {
      "phoneNumber": new FormControl(this._phone, [Validators.required, Validators.pattern(/^[0-9 - _]*$/)])
    };
  }
}

export class IxpertaPayForm extends PayForm {
  constructor( _phone: string){super(_phone)}

  public buildForm(useOTP: boolean): FormGroup {
      let formControls = this.getControlForm()
      return new FormGroup({
        ...formControls,
        codeOTP: new FormControl(null, [useOTP ? Validators.required : Validators.nullValidator])
      })
  }
}

export class Hub2PayForm extends PayForm {
  constructor(
    _phone: string){super(_phone)}

 public buildForm(useOTP?: boolean): FormGroup {
     let formControls = this.getControlForm()
     return new FormGroup({ ...formControls})
 }
}
