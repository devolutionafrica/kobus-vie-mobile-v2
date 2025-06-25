import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EXTRANET_CLIENT_API } from 'src/app/repository/EXTRANET_CLIENT_API';
import { DownloaderHandler } from './../handlers/DownloaderHandler';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DownloaderService extends DownloaderHandler {

  constructor(private extranetAPI: EXTRANET_CLIENT_API, private http: HttpClient) {
    super(extranetAPI)
  }

  downloadPDFBinFormat(queryBody: Object): Promise<Blob> {
    return this.downloadBinFormat(queryBody)
  }

  downloadPDFFileFormat(queryBody: Object) {
    return this.downloadFile(queryBody)
  }

  downloadAvisSituationPDFBinFormat(queryBody: Object): Promise<Blob> {
    return this.downloadAvisSituationBinFormat(queryBody)
  }

  downloadAvisSituationPDFFileFormat(queryBody: Object): Promise<any> {
    return this.downloadAvisSituationFile(queryBody)
  }
}
