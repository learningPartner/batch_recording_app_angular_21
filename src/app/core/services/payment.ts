import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiMethodConstant, Controllers, METHOD_NAME } from '../constant/Global.constant';
import { Payment } from '../model/classes/Payment.Model';
import { Observable } from 'rxjs';
import { IAPIRepsone } from '../model/interfaces/Common.Model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  http = inject(HttpClient);

  getAllPayments(): Observable<IAPIRepsone> {
    return this.http.get<IAPIRepsone>(environment.API_URL + ApiMethodConstant.PAYMENT);
  }

  getEnrollmentPaymentSummary(candidateId?: number, batchId?: number): Observable<IAPIRepsone> {
    let params = new HttpParams();
    if (candidateId && candidateId > 0) {
      params = params.set('candidateId', candidateId.toString());
    }
    if (batchId && batchId > 0) {
      params = params.set('batchId', batchId.toString());
    }

    return this.http.get<IAPIRepsone>(
      environment.API_URL + Controllers.PAYMENT + METHOD_NAME.PAYMENT.GET_PAYMENT_SUMMARY,
      { params }
    );
  }

  createPayment(obj: Payment): Observable<IAPIRepsone> {
    return this.http.post<IAPIRepsone>(environment.API_URL + ApiMethodConstant.PAYMENT, obj);
  }

  updatePayment(obj: Payment): Observable<IAPIRepsone> {
    return this.http.put<IAPIRepsone>(environment.API_URL + ApiMethodConstant.PAYMENT + '/' + obj.paymentId, obj);
  }

  deletePayment(id: number): Observable<IAPIRepsone> {
    return this.http.delete<IAPIRepsone>(environment.API_URL + ApiMethodConstant.PAYMENT + '/' + id);
  }

  getAllEnrollments(): Observable<IAPIRepsone> {
    return this.http.get<IAPIRepsone>(environment.API_URL + ApiMethodConstant.GET_ALL_ENROLLMENT);
  }
}
