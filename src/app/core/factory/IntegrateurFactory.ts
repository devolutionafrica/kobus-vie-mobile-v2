export class IntegrateurFactory {
  public static build(jsonData: any): IIntegrateur {
    return {
      libelle: jsonData.LIBELLE,
      isActive: jsonData.IS_ACTIF,
      urlAPI: jsonData.URL_API,
      logo: jsonData.LOGO,
      description: jsonData.DESCRIPTION
    }
  }
}

export interface IIntegrateur {
  libelle: string
  isActive: boolean
  urlAPI: string
  logo: string
  description: string
}
