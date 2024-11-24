export interface CodeResponse {
  id: number;
  documentId: string;
  code: string;
  codeStatus: CodeStatus;
  expirationDate: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
}

export interface Code {
  documentId: string;
  code: string;
  codeStatus: CodeStatus;
  expirationDate: null;
}

export enum CodeStatus {
  NOT_CONFIRMED = 'NOT_CONFIRMED',
  EXPIRED = 'EXPIRED',
  CONFIRMED = 'CONFIRMED',
  RECONFIRMED = 'RECONFIRMED',
}
