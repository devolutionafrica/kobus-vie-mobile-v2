import { PDFBase64Factory } from '../factory/PDFBase64Factory';
import { IExtranetAdaptor } from "../adaptors/IExtranetAdaptor";

export abstract class DownloaderHandler {
  message:string
  constructor(
    private urlAPI:IExtranetAdaptor){}

  protected async downloadBinFormat(queryBody:Object):Promise<Blob>{
    return await this.urlAPI.downloadReleveCotisationBin(queryBody)
      .then(
        rawData => {
          const pdfBase64 = PDFBase64Factory.build(rawData.ReleveCotisationReport)
          return pdfBase64
        }
      )
    }

  protected async downloadFile(queryBody:Object):Promise<any>{
    return await this.urlAPI.downloadReleveCotisationFile(queryBody)
      .then(rawData => rawData)
    }

  protected async downloadAvisSituationBinFormat(queryBody:Object):Promise<any>{
    return await this.urlAPI.downloadAvisSituationBIN(queryBody)
      .then(
        rawData => {
          console.log('bin format data :::> ', rawData)
          const pdfBase64 = PDFBase64Factory.build(rawData.AvisSituationReport)
          return {
            blobData: pdfBase64,
            ...rawData
          }
        }
      )
    }

  protected async downloadAvisSituationFile(queryBody:Object):Promise<any>{
    return await this.urlAPI.downloadAvisSituationPDF(queryBody)
      .then(rawData => rawData)
    }


}
