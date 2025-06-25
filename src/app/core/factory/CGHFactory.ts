import { CGU } from './../entities/CGU';
export class CGUFactory {
  public static build(jsonData: any): CGU {
    return new CGU(
      jsonData.NomArticle,
      jsonData.ObjetArticle,
      jsonData.DescriptionArticle
    );
  }
}
