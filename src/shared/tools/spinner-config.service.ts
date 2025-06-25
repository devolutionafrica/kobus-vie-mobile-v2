import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SpinnerConfigService  {

  private template: HTMLBaseElement

  public subjectMsg: BehaviorSubject<string> = new BehaviorSubject<string>("")

  constructor(){}

  public setMessage(msg: string){
    this.subjectMsg.next(msg)
  }

}
