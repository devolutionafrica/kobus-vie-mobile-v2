import {IAgence } from './../factory/AgencesFactory';
import { Injectable } from '@angular/core';
import { EXTRANET_CONFIG_API } from 'src/app/repository/EXTRANET_CONFIG_API';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AgenceService {

  constructor(
    private extranetAPI: EXTRANET_CONFIG_API) {}

  getAgences(): Promise<IAgence[]>{
    return this.extranetAPI.listAgence()
      .then((data: any) => data.Agences);
    }
}
