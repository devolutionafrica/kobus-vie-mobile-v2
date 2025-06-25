export interface IClient {
  numeroClient: number,
  nomClient: string,
  prenomClient: string,
  dateNaissanceClient: string,
  lieuNaissanceClient: string,
  contactClient: string,
  adressePostalClient: string,
  adresseEmailClient: string,
  civilite?: string,
  nationalite?: string,
  profession?: string,
  genre?: string,
}
