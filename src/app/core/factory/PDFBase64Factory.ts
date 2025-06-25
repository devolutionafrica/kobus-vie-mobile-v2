import { Tools } from '../../../shared/tools/utils';
export class PDFBase64Factory {
  public static build(jsonData:any):Blob {
    // return Tools.createPdfByBase64(jsonData.ReleveCotisationReport)
    return Tools.b64toBlob(jsonData, 'application/pdf')
  }
}
