export class ResetAccountResponseFactory {
  public static build(jsonData:any):IResetAccountData {
    return {
      login: jsonData.LOGIN,
      nom: jsonData.NOM_CLIENT,
      prenom: jsonData.PRENOMS_CLIENT,
      password: jsonData.MOT_DE_PASSE,
    }
  }
}

export interface IResetAccountData {
  login:string
  password:string
  nom:string
  prenom:string
}
