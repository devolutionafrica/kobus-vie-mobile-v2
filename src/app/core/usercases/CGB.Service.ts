import { JsonCGU } from './../entities/CGU';
import { CGUHandler } from './../handlers/CGUHandler';
import { EXTRANET_CONFIG_API } from './../../repository/EXTRANET_CONFIG_API';
import { Injectable } from '@angular/core';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CGUService extends CGUHandler{

  constructor(
      extranetAPI: EXTRANET_CONFIG_API){
      super(extranetAPI);
    }

  cgu(): Promise<JsonCGU[]|boolean>{
      return this.loadCGU();
    }
}
