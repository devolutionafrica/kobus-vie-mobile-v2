export interface IExtranetAdaptor {
  authUser(queryBody: Object): Promise<any>;
  userProfil(queryBody: Object): Promise<any>;
  resetAccount(queryBody: Object): Promise<any>;
  listContrat(queryBody: Object): Promise<any>;
  listImpayes(queryBody: Object): Promise<any>;
  contratInfo(queryBody: Object): Promise<any>;
  detailContrat(queryBody: Object): Promise<any>;
  addPrestation(queryBody: Object): Promise<any>;
  detailContrat(queryBody: Object): Promise<any>;
  listPrestation(queryBody: Object): Promise<any>;
  updateUserProfil(queryBody: Object): Promise<any>;
  simulationDemande(queryBody: Object): Promise<any>;
  updateUserPassword(queryBody: Object): Promise<any>;
  savePrimeOperationPay(queryBody: Object): Promise<any>;
  downloadAvisSituationPDF(queryBody: Object): Promise<any>;
  downloadAvisSituationBIN(queryBody: Object): Promise<any>;
  downloadReleveCotisationBin(queryBody: Object): Promise<any>;
  downloadReleveCotisationFile(queryBody: Object): Promise<any>;
}
