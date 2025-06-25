export interface IPaymentIntegratorApiAdaptor {
  intentPay(queryBody: object): Promise<any>;
  verifyPaymentStatus(queryBody: object): Promise<any>;
}

export interface IPaiementRespnse {
  paye: boolean,
  description: any,
  amount: number,
  dateCreated: string,
  phoneNumber: string,
  transactionId: string
}
