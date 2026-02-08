export const GlobalConstant = {
    LOCAL_KEY_LOGIN:'batchuser'
}


export const ApiMethodConstant = {
    BATCH: 'Batches',
    ENROLLMENTS: 'BatchEnrollments',
    GET_ALL_ENROLLMENT:'BatchEnrollments/GetAllEnrollment',
    SESSIONS:'BatchSessions',
    CANDIDATES:'Candidates'
}

export const Controllers = {
    BATCH: 'Batches',
    ENROLLMENTS: 'BatchEnrollments', 
    SESSIONS:'BatchSessions',
    CANDIDATES:'Candidates',
    DASHBOARD:'BatchDashboard/'
}

export const METHOD_NAME = {
    ENROLMENT: {
        GET_ALL_ENROLLMENT:'GetAllEnrollment',
        GET_BY_BATCH_UD:'BYID',
        GET_ENROLLMENT_BY_CANDIDATE:'by-candidate'
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
    }
}




 
