export class AppConfig {

  constructor(
    private _status: boolean,
    private _step:appConfigStep
    ){}

  public get status():boolean {
    return this._status
  }

  public set status(value:boolean) {
    this._status = value
  }

  public set step(value:appConfigStep){
    this._step = value
  }

  public get step():appConfigStep {
    return this._step
  }

  public json(): IAppConfig {
    let jsonObject: IAppConfig;
    jsonObject = {
      step: this._step,
      status: this._status
    };
    return jsonObject
  }

  string(): string {
   return JSON.stringify(this.json())
  }


}

export enum appConfigStep {
  INIT= 'INIT',
  PROGRESS= 'PROGRESS',
  COMPLETED='COMPLETED'
}

export interface IAppConfig {
  step:appConfigStep
  status:boolean
}
