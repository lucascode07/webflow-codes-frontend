import { CodeStatus } from './code.model';

export interface AttendeeRequest {
  data: Data;
}

export interface Data {
  fullName: string;
  phone: string;
  email: string;
  codeStatus: CodeStatus;
}
