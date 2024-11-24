import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Code, CodeResponse, CodeStatus } from '../models/code.model';
import { environment } from '../../environments/environment';
import { delay, map, Observable, tap } from 'rxjs';
import { codeMapper } from '../utils/mappers/code.mapper';

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  private readonly _http = inject(HttpClient);

  private code?: Code;

  public get codeValue() {
    return this.code;
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
}
