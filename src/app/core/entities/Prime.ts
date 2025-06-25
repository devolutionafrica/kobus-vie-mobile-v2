export class Prime {
  private _selected: boolean;
  constructor(
    private _codeFiliale: string,
    private _libelleProduit: string,
    private _numeroQuittance: number,
    private _primePeriodique: number,
    private _numeroPolice: number,
    private _debutPeriode: string,
    private _finPeriode: string,
    private _etatQuittance: string,
  ){
    this._selected = false;
  }

  toJson(): IPrime {
    return {
      codeFiliale: this._codeFiliale,
      libelleProduit: this._libelleProduit,
      numeroQuittance: this._numeroQuittance,
      primePeriodique: this._primePeriodique,
      numeroPolice: this._numeroPolice,
      debutPeriode: this._debutPeriode,
      finPeriode: this._finPeriode,
      etatQuittance: this._etatQuittance,
      selected: this._selected
    };
  }

  setSelected(value: boolean){
    this._selected = value;
  }
}

export interface IPrime {
  codeFiliale: string;
  libelleProduit: string;
  numeroQuittance: number;
  primePeriodique: number;
  numeroPolice: number;
  debutPeriode: string;
  finPeriode: string;
  etatQuittance: string;
  selected: boolean;
}
