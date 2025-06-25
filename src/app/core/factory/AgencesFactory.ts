export class AgencesFactory {
  public static build(rawData: any): IAgence {
    return {
      idAgence: rawData.IdAgence,
      districtAgence: rawData.DistrictAgence,
      localisationAgence: rawData.LocalisationAgence,
      telephoneAgence: rawData.TelephoneAgence,
      coord: {
        longitude: rawData.Longitude,
        latitude: rawData.Latitude
      }
    }
  }
}

export interface IAgence {
  idAgence: number,
  districtAgence: string,
  localisationAgence: string,
  telephoneAgence: string,
  coord: {
    longitude: number,
    latitude: number
  }
}
