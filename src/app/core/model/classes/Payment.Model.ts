export class Payment {
  paymentId: number;
  enrollId: number;
  enrollmentNo: string;
  paymentDate: string;
  amount: number;
  naration: string;
  candidateName?: string;
  batchName?: string;

  constructor() {
    this.paymentId = 0;
    this.enrollId = 0;
    this.paymentDate = '';
    this.amount = 0;
    this.naration = '';
    this.enrollmentNo = '';
  }
}
