export class ObjectSouscripteurFactory {

  public static build(jsonData:any):IObjectSouscripteur {
    return {
      nom: jsonData.NomSouscripteur || "",
      prenoms: jsonData.PrenomsSouscripteur || "",
      dateNaissance: jsonData.DateNaissanceSouscripteur || "",
      lieuNaissance: jsonData.LieuNaissanceSouscripteur || "",
      adressePostale: jsonData.AdressePostaleSouscripteur || "",
      nationalite: jsonData.Nationalite || "",
      profession: jsonData.ProfessionAssure || "",
      civilite: jsonData.SexeAssure || "",
      adresseEmail: jsonData.eMailAssure || "",
      situationMatrimoniale: jsonData.SituationMatrimonialeAssure || "",
      telephone: jsonData.TelephoneSouscripteur || ""
    }
  }
}

export interface IObjectSouscripteur {
  nom: string
  prenoms: string
  dateNaissance: string
  lieuNaissance: string
  adressePostale: string
  nationalite: string
  profession: string
  civilite: string
  adresseEmail: string
  situationMatrimoniale: string
  telephone: string
}
