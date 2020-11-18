import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
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
  public getUsers(id) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'c2lkZTIwMjA=');
    return this.http.get(environment.baseUrl + environment.api.users + '?id_condominio=1', { headers });
    // return this.http.get('../../assets/data/user.json');

  }
  public addUsers(user) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'c2lkZTIwMjA=');
    return this.http.post(environment.baseUrl + environment.api.users, user, { headers });

  }
  public removeUsers(id) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'c2lkZTIwMjA=');
    const options = {
      headers,
      body: id
    };
    return this.http.delete(environment.baseUrl + environment.api.users, options);

  }
  public editUser(user) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'c2lkZTIwMjA=');
    return this.http.put(environment.baseUrl + environment.api.users, user, { headers });

  }
}
