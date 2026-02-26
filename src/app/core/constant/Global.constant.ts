export const GlobalConstant = {
    LOCAL_KEY_LOGIN:'batchuser'
}


export const ApiMethodConstant = {
    BATCH: 'Batches',
    ENROLLMENTS: 'BatchEnrollments',
    GET_ALL_ENROLLMENT:'BatchEnrollments/GetAllEnrollment',
    SESSIONS:'BatchSessions',
    CANDIDATES:'Candidates',
    PAYMENT: 'BatchPayment'
}

export const Controllers = {
    BATCH: 'Batches',
    ENROLLMENTS: 'BatchEnrollments/', 
    SESSIONS:'BatchSessions',
    CANDIDATES:'Candidates',
    DASHBOARD:'BatchDashboard/',
    PAYMENT: 'BatchPayment/'
}

export const METHOD_NAME = {
    ENROLMENT: {
        GET_ALL_ENROLLMENT:'GetAllEnrollment',
        GET_BY_BATCH_UD:'BYID',
        GET_ENROLLMENT_BY_CANDIDATE:'by-candidate',
        CREATE_CANDIDATE_ENROLLMENT: 'create-candidate-and-enroll'
    
    },
    DASHBOARD: {
        GET_ADMIN_DASHBOARD:'GetAdminDashboard',
        BATCH_CANDIDATES:'batch-candidates',
        GET_CANDIDATE_DASHBOADD:'candidate/',
        GET_CANDIDATE_BATCH_RECORDING_:'GetBatchWiseRecordingCount?userId='
    },
    SESSION: {
        GET_SESSION_BY_BATCH:'by-batch',
        GET_ALL_RECORDING: 'GetAllSessionsRecordings'
    },
    PAYMENT: {
        GET_PAYMENT_SUMMARY:'getEnrollmentPaymentSummary'
    }
    
}




 
