import { Component, inject, OnInit, signal } from '@angular/core';
import { BatchService } from '../../core/services/batch/batch-service';
import { DashboardService } from '../../core/services/dashboard/dashboardService';
import { User } from '../../core/services/user/user';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf,NgFor],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  batchSrv = inject(BatchService);
  dashSrv = inject(DashboardService);
  userSrv = inject(User);
  adminDashData= signal<any>({});
  batchWiseData= signal<any>({});

  candidateDashData= signal<any>({});
    candidatebatchWiseData= signal<any>({});
  loggedUserData: any;

  constructor() {
    this.batchSrv.roleSub.subscribe((res) => {

    })
    this.batchSrv.roleBehvaiourSub.subscribe((res) => {

    })
  }

  ngOnInit(): void {
    this.userSrv.loggedUserData$.subscribe((res: any) => {
      this.loggedUserData = res;
      if (this.loggedUserData.role == "Super Admin") {
        this.getAdminDash()
        this.getBatchWiseCandidates()
      } else {
        this.getCandidateDash();
        this.getCandidateBtachRecording()
      }
    })

  }
  getAdminDash() {
    this.dashSrv.getAdminDashboard().subscribe({
      next: (res: any) => {
        this.adminDashData.set(res.data)
      }
    })
  }

  getBatchWiseCandidates() {
    this.dashSrv.getBatchWiseCandidates().subscribe({
      next: (res: any) => {
        this.batchWiseData.set(res.data)
      }
    })
  }

  getCandidateDash() {
    this.dashSrv.getCandidateDash(this.loggedUserData.candidateId).subscribe({
      next: (res: any) => {
        this.candidateDashData.set(res.data)
      }
    })
  }

  getCandidateBtachRecording() {
    this.dashSrv.getCandidateBtachRecording(this.loggedUserData.candidateId).subscribe({
      next: (res: any) => {
        this.candidatebatchWiseData.set(res.data)
      }
    })
  }




}
