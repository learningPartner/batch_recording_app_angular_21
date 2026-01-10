export class CandidateModel {
  candidateId: number;
  fullName: string;
  email: string;
  mobileNumber: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;

  constructor() {
    this.candidateId = 0;
    this.fullName = "";
    this.email = "";
    this.mobileNumber = "";
    this.password = "";
    this.role = "";
    this.isActive = false;
    this.createdAt = "";
    this.updatedAt = "";
  }
}
