import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { BatchMaster } from './pages/batch-master/batch-master';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './core/guard/auth-guard';
import { Candidates } from './pages/candidates/candidates';
import { Enrollment } from './pages/enrollment/enrollment';
import { SessionRecordings } from './pages/session-recordings/session-recordings';
import { CandidateDashboard } from './pages/candidate-dashboard/candidate-dashboard';
import { CandidateSessionRecord } from './pages/candidate-session-record/candidate-session-record';
import { CandidateRegistration } from './pages/candidate-registration/candidate-registration';
import { Payment } from './pages/payment/payment';
import { PaymentReport } from './pages/payment-report/payment-report';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:Login
    },
    {
        path:'candidate-registration',
        component: CandidateRegistration
    },
    {
        path:'',
        component: Layout,
        canActivate: [authGuard],
        children:[
            {
                path:'batch',
                component: BatchMaster
            },
             {
                path:'candidate',
                component: Candidates
            },
            {
                path:'enrollment',
                component: Enrollment
            },
            {
                path:'session-recordings',
                component: SessionRecordings
            },
            {
                path:'payment',
                component: Payment
            },
            {
                path:'payment-report',
                component: PaymentReport
            },
            {
                path:'candidate-dashboard',
                component: CandidateDashboard
            },
            {
                path:'candidate-recordings',
                component: CandidateSessionRecord
            },
            {
                path:'dashboard',
                component: Dashboard,
                canActivate: [authGuard]
            }
        ]
    }

];



