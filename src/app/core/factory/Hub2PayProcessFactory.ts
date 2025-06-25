export class Hub2PayProcessFactory {

  public static build(jsonData: any): IHub2PayProcessResponse {
    return {
      status: jsonData.Statut,
      amount: jsonData.Amount,
      message: jsonData.Message,
      dateCreated: jsonData.DateCreation,
      paymentId: jsonData.PaymentId,
      phoneNumber: jsonData.PurchaseReference,
      transactionRef: jsonData.PurchaseReference
    };
  }
}

export interface IHub2PayProcessResponse {
  status: string;
  amount: string;
  message: string;
  paymentId: string;
  phoneNumber: string;
  dateCreated: string;
  transactionRef: string;
}

export interface IHub2PayProcessQueryBody {
  IdentificationPayment: string;
  ConfirmationCodeCustomer?: string;
}

export const HUB2_OPERATOR = {
  OR: 0,
  MTN: 1,
  MOOV: 2
};

