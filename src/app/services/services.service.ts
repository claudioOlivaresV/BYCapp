import { Injectable } from '@angular/core';
import { HttpClientModule , HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  public login(user) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'c2lkZTIwMjA=');
    return this.http.post(environment.baseUrl + environment.api.login, user, { headers });
  }
  public getUsers() {
    let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('Authorization', 'c2lkZTIwMjA=');
    // return this.http.get(environment.baseUrl + environment.api.login, { headers });
    return this.http.get('../../assets/data/user.json');

  }
}
