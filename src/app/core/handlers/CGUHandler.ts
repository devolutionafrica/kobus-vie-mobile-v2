import { CGUFactory } from './../factory/CGHFactory';
import { EXTRANET_CONFIG_API } from 'src/app/repository/EXTRANET_CONFIG_API';
import {JsonCGU } from '../entities/CGU';
import { BehaviorSubject } from 'rxjs';

export abstract class CGUHandler {
  cguList: JsonCGU[];
  cguBehaviorSubject: BehaviorSubject<JsonCGU[]>;
  constructor(
    private extranetRepo: EXTRANET_CONFIG_API){
    this.cguList = [];
    this.cguBehaviorSubject = new BehaviorSubject<JsonCGU[]>(this.cguList);
  }

  loadCGU(): Promise<JsonCGU[]|boolean> {
    return this.extranetRepo.cgu()
      .then(
        rawData => {
          if (rawData.Statut === 200) {
            this.generateCGUList(rawData.Articles);
            this.updateBehaviorSubject();
            return this.cguList as JsonCGU[];
          }
          return false as boolean;
        }
      );
  }

  generateCGUList(data: any){
    for (const article of data) {
      this.createItemCGUAndPush(article);
    }
  }

  updateBehaviorSubject(){
    this.cguBehaviorSubject.next(this.cguList);
  }

  createItemCGUAndPush(article: any){
    this.cguList.push(CGUFactory.build(article).toJson());
  }
}
