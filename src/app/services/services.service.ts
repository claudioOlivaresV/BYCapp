import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  public login(user) {
    const headers: HttpHeaders = new HttpHeaders();
    return this.http.post(environment.baseUrl + environment.api.login, user, { headers });
  }
}
