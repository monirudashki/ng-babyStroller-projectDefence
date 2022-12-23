import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBabyStroller } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  loadStrollersForAdmin$(page: number): Observable<IBabyStroller[]> {
    return this.httpClient.get<IBabyStroller[]>(`${environment.apiUrl}/stroller/admin?page=${page}`);
  }

  adminModerateStroller$(strollerId: string): Observable<IBabyStroller> {
    return this.httpClient.get<IBabyStroller>(`${environment.apiUrl}/stroller/admin/${strollerId}/moderate` , { withCredentials: true })
  }

  adminApproveStroller$(strollerId: string): Observable<IBabyStroller> {
    return this.httpClient.get<IBabyStroller>(`${environment.apiUrl}/stroller/admin/${strollerId}/approve` , { withCredentials: true })
  }
}
