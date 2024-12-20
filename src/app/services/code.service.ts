import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Code, CodeResponse, CodeStatus } from '../models/code.model';
import { environment } from '../../environments/environment';
import { delay, map, Observable, tap } from 'rxjs';
import { codeMapper } from '../utils/mappers/code.mapper';
import { AttendeeRequest } from '../models/attende.model';

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  private readonly _http = inject(HttpClient);

  private code?: Code;
  private fullName?: string;

  public get codeValue() {
    return this.code;
  }

  public get fullNameValue() {
    return this.fullName;
  }

  public verifyCode(code: string): Observable<CodeStatus> {
    return this._http
      .get<CodeResponse>(`${environment.baseURL}/attendances/${code}`)
      .pipe(
        delay(1000),
        tap((codeData) => (this.code = codeMapper(codeData))),
        map((codeData) => codeData.codeStatus),
      );
  }

  public registerAttendee(body: AttendeeRequest) {
    return this._http
      .put<any>(
        `${environment.baseURL}/attendances/${this.code?.documentId}`,
        body,
      )
      .pipe(tap((res) => (this.fullName = res['data'].fullName)));
  }
}
