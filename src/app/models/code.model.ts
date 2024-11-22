export interface CodeResponse {
  id: number;
  documentId: string;
  code: string;
  codeStatus: string;
  expirationDate: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
}

export interface Code {
  documentId: string;
  code: string;
  codeStatus: string;
  expirationDate: null;
}
