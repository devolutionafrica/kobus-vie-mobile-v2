import { Authentification } from "../entities/Authentification";

export class UserAuthFactory {
  public static build(jsonData:any):Authentification {
    return new Authentification(
      jsonData._CodeFiliale,
      jsonData._NumeroClient,
      jsonData._fullname,
      jsonData._roles
    );
  }
}
