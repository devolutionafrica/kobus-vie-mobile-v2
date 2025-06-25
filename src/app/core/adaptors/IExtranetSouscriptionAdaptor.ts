export interface IExtranetSouscriptionAdaptor {
  loadDateEffets(): Promise<any>
  definitionProduit(): Promise<any>
  loadDefaultCodeApporteur(): Promise<any>
  saveCotation(queryBody: any): Promise<any>
  findProposition(queryBody: any): Promise<any>
  createContrat(queryBody: any): Promise<any>
  createContratByFile(queryBody: any): Promise<any>
  loadDureeContrats(queryBody: any): Promise<any>
  simulateProposition(queryBody: any): Promise<any>
  validateProposition(queryBody: any): Promise<any>
  getGarantieFacultativeAmount(queryBody: any): Promise<any>
  getListCapitalByPeriodicite(queryBody: any): Promise<any>
}
