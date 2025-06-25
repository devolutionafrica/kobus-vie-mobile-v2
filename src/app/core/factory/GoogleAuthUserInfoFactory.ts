export class GoogleAuthUserInfoFactory {
  public static build(jsonData:any):IGoogleAuthUserInfo {
    let googleUserInfo:IGoogleAuthUserInfo = {
      id: jsonData.id,
      email: jsonData.email,
      familyName: jsonData.familyName,
      givenName: jsonData.givenName,
      imageUrl: jsonData.imageUrl
    }
    return googleUserInfo
  }
}

export interface IGoogleAuthUserInfo {
  id: string,
  email: string,
  familyName: string,
  givenName: string,
  imageUrl: string
}
