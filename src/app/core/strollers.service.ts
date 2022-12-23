import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBabyStroller } from './interfaces';
import { strollerData } from './interfaces/strollerData';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class StrollersService {

  constructor(private httpClient: HttpClient) { }

  createStroller$(strollerData: strollerData): Observable<IBabyStroller> {
    return this.httpClient.post<IBabyStroller>(`${environment.apiUrl}/stroller`, strollerData, { withCredentials: true })
  }

  loadStrollers$(page: number): Observable<IBabyStroller[]> {
    return this.httpClient.get<IBabyStroller[]>(`${environment.apiUrl}/stroller?page=${page}`);
  }

  getStrollersLength$(): Observable<number> {
    return this.httpClient.get<number>(`${environment.apiUrl}/stroller/strollersLength`);
  }
 
  loadStrollerById$(id: string): Observable<IBabyStroller> {
    return this.httpClient.get<IBabyStroller>(`${apiUrl}/stroller/${id}`);
  }

  updateStroller$(strollerData: strollerData, id: string): Observable<IBabyStroller> {
    return this.httpClient.put<IBabyStroller>(`${environment.apiUrl}/stroller/${id}/edit`, strollerData, { withCredentials: true });
  }

  deleteStroller$(id: string): Observable<IBabyStroller> {
    return this.httpClient.delete<IBabyStroller>(`${environment.apiUrl}/stroller/${id}/delete`, { withCredentials: true })
  }

  likeStroller$(id: string): Observable<IBabyStroller> {
    return this.httpClient.put<IBabyStroller>(`${environment.apiUrl}/stroller/${id}/like`, {} ,{ withCredentials: true });
  }

  unlikeStroller$(id: string): Observable<IBabyStroller> {
    return this.httpClient.put<IBabyStroller>(`${environment.apiUrl}/stroller/${id}/unlike`, {} ,{ withCredentials: true });
  }

  getResultBySearch$(searchBy: string , search: string , page: number): Observable<IBabyStroller[]> {
    return this.httpClient.get<IBabyStroller[]>(`${environment.apiUrl}/stroller/search?searchBy=${searchBy}&search=${search}&page=${page}`);
  }

  loadUserStrollers$(userId: string , page: number): Observable<IBabyStroller[]> {
    return this.httpClient.get<IBabyStroller[]>(`${environment.apiUrl}/stroller/userStrollers/${userId}?page=${page}` , {withCredentials: true});
  }

  loadUserStrollersHolding$(userId: string): Observable<IBabyStroller[]> {
    return this.httpClient.get<IBabyStroller[]>(`${environment.apiUrl}/stroller/userStrollers/${userId}/holding` , {withCredentials: true});
  }

  loadUserStrollersModerated$(userId: string): Observable<IBabyStroller[]> {
    return this.httpClient.get<IBabyStroller[]>(`${environment.apiUrl}/stroller/userStrollers/${userId}/moderated` , {withCredentials: true});
  }

  getUserStrollersLength$(userId: string): Observable<number> {
    return this.httpClient.get<number>(`${environment.apiUrl}/stroller/userStrollersLength/${userId}` , { withCredentials: true });
  }

  getResultBySearchLength$(searchBy: string , search: string): Observable<number> {
    return this.httpClient.get<number>(`${environment.apiUrl}/stroller/searchLength?searchBy=${searchBy}&search=${search}`);
  }
}

