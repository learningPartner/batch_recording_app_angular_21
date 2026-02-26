import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { genericSearch } from '../../core/helper/helper';
import { Payment as PaymentModel } from '../../core/model/classes/Payment.Model';
import { IAPIRepsone } from '../../core/model/interfaces/Common.Model';
import { PaymentService } from '../../core/services/payment';
import { User } from '../../core/services/user/user';

@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule, DatePipe, DecimalPipe],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment implements OnInit, OnDestroy {
  paymentForm: FormGroup = new FormGroup({});
  paymentSrv = inject(PaymentService);
  userSrv = inject(User);
  paymentList = signal<PaymentModel[]>([]);
  originalPaymentList = signal<PaymentModel[]>([]);
  enrollmentList = signal<any[]>([]);
  isLoading = signal<boolean>(false);
  subscription: Subscription = new Subscription();

  constructor() {
    this.initializeForm();
    this.subscription.add(
      this.userSrv.onSearchChange.subscribe((searchText: string) => {
        if (!searchText || searchText.trim() === '') {
          this.paymentList.set(this.originalPaymentList());
          return;
        }

        const filterRecord = genericSearch(this.originalPaymentList(), searchText) as PaymentModel[];
        this.paymentList.set(filterRecord);
      })
    );
  }

  ngOnInit(): void {
    this.getAllEnrollments();
    this.getPayments();
  }

  initializeForm() {
    this.paymentForm = new FormGroup({
      paymentId: new FormControl(0),
      enrollId: new FormControl(0),
      enrollmentNo: new FormControl(''),
      paymentDate: new FormControl(''),
      amount: new FormControl(0),
      naration: new FormControl(''),
    });
  }

  getPayments() {
    this.isLoading.set(true);
    this.subscription.add(
      this.paymentSrv.getAllPayments().subscribe({
        next: (res: IAPIRepsone) => {
          this.isLoading.set(false);
          const paymentData = (res.data ?? []) as PaymentModel[];
          this.paymentList.set(paymentData);
          this.originalPaymentList.set(paymentData);
        },
        error: (error) => {
          this.isLoading.set(false);
          alert('Api Error ' + (error?.error?.message ?? 'Failed to load payments'));
        },
      })
    );
  }

  getAllEnrollments() {
    this.subscription.add(
      this.paymentSrv.getAllEnrollments().subscribe({
        next: (res: IAPIRepsone) => {
          this.enrollmentList.set(res.data ?? []);
        },
      })
    );
  }

  onEnrollmentChange() {
    const selectedEnrollmentId = Number(this.paymentForm.controls['enrollId'].value);
    const selectedEnrollment = this.enrollmentList().find(
      (item: any) => Number(item.enrollmentId) === selectedEnrollmentId
    );

    this.paymentForm.patchValue({
      enrollmentNo: selectedEnrollment?.enrollmentNo ?? '',
    });
  }

  onSavePayment() {
    const paymentObj = this.preparePayload();
    if (!paymentObj.enrollId || !paymentObj.paymentDate || paymentObj.amount <= 0) {
      alert('Please select enrollment, payment date and valid amount.');
      return;
    }

    if (paymentObj.paymentId > 0) {
      this.updatePayment(paymentObj);
    } else {
      this.createPayment(paymentObj);
    }
  }

  preparePayload(): PaymentModel {
    const formValue = this.paymentForm.value;
    const paymentObj = new PaymentModel();
    paymentObj.paymentId = Number(formValue.paymentId) || 0;
    paymentObj.enrollId = Number(formValue.enrollId) || 0;
    paymentObj.enrollmentNo = (formValue.enrollmentNo ?? '').toString();
    paymentObj.paymentDate = (formValue.paymentDate ?? '').toString();
    paymentObj.amount = Number(formValue.amount) || 0;
    paymentObj.naration = (formValue.naration ?? '').toString();
    return paymentObj;
  }

  createPayment(obj: PaymentModel) {
    this.paymentSrv.createPayment(obj).subscribe({
      next: (res: IAPIRepsone) => {
        if (res.result) {
          this.onAddEditSuccess(res);
        } else {
          alert(res.message);
        }
      },
      error: (error) => {
        alert('Api Error ' + (error?.error?.message ?? 'Unable to save payment'));
      },
    });
  }

  updatePayment(obj: PaymentModel) {
    this.paymentSrv.updatePayment(obj).subscribe({
      next: (res: IAPIRepsone) => {
        if (res.result) {
          this.onAddEditSuccess(res);
        } else {
          alert(res.message);
        }
      },
      error: (error) => {
        alert('Api Error ' + (error?.error?.message ?? 'Unable to update payment'));
      },
    });
  }

  onAddEditSuccess(res: IAPIRepsone) {
    alert(res.message);
    this.getPayments();
    this.resetForm();
  }

  onEdit(item: PaymentModel) {
    this.paymentForm.patchValue({
      paymentId: item.paymentId,
      enrollId: item.enrollId,
      enrollmentNo: item.enrollmentNo,
      paymentDate: this.toInputDate(item.paymentDate),
      amount: item.amount,
      naration: item.naration,
    });
  }

  onDelete(paymentId: number) {
    if (confirm('Are you sure you want to delete this payment?')) {
      this.paymentSrv.deletePayment(paymentId).subscribe({
        next: (res: IAPIRepsone) => {
          if (res.result) {
            alert(res.message);
            this.getPayments();
          } else {
            alert(res.message);
          }
        },
        error: (error) => {
          alert('Api Error ' + (error?.error?.message ?? 'Unable to delete payment'));
        },
      });
    }
  }

  resetForm() {
    this.paymentForm.reset();
    this.paymentForm.patchValue({
      paymentId: 0,
      enrollId: 0,
      enrollmentNo: '',
      paymentDate: '',
      amount: 0,
      naration: '',
    });
  }

  toInputDate(dateValue: string): string {
    if (!dateValue) {
      return '';
    }

    if (dateValue.includes('T')) {
      return dateValue.split('T')[0];
    }

    if (dateValue.length >= 10) {
      return dateValue.substring(0, 10);
    }

    const parsedDate = new Date(dateValue);
    if (Number.isNaN(parsedDate.getTime())) {
      return '';
    }

    const month = `${parsedDate.getMonth() + 1}`.padStart(2, '0');
    const day = `${parsedDate.getDate()}`.padStart(2, '0');
    return `${parsedDate.getFullYear()}-${month}-${day}`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
