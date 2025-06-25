export class Hub2InitPayFactory {
  public static build(jsonData: any): IHub2InitPayResponse {
    return {
      frais: jsonData.Fees,
      amount: jsonData.Amount,
      message: jsonData.Message,
      paymentId: jsonData.PaymentIntentId,
      totalAmount: jsonData.TotalTransaction,
      phoneNumber: jsonData.CustomerReference,
      modeConfirmation: jsonData.TypeConfirmation
    };
  }
}

export interface IHub2InitPayResponse {
  frais: string
  amount: number
  message: string
  paymentId: string
  totalAmount: number
  phoneNumber: string
  modeConfirmation: string,
}

export interface IHub2InitPayQueryBody {
  Amount: number;
  Operateur: string;
  CustomerReference: string;
  DescriptionPayment: string
}
