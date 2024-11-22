import { CodeResponse } from '../../models/code.model';

export function codeMapper({
  documentId,
  code,
  codeStatus,
  expirationDate,
}: CodeResponse) {
  return {
    documentId,
    code,
    codeStatus,
    expirationDate,
  };
}
