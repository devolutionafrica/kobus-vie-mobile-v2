export interface IExtranetPaiementMobile {
  payPrime(requestBody:Object):Promise<any>
  verifyPayProcess(requestBody:Object):Promise<any>
}
