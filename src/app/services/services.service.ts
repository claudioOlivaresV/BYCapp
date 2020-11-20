import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    return this.http.get(environment.baseUrl + environment.api.users + '?id_condominio=' + id, { headers });
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
    const params = new HttpParams().append('id', id);
    return this.http.delete(environment.baseUrl + environment.api.users , { headers, params });

  }
  public editUser(user) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'c2lkZTIwMjA=');
    return this.http.put(environment.baseUrl + environment.api.users, user, { headers });

  }
  public getAcces(id, page) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'c2lkZTIwMjA=');
    let  params = new HttpParams();
    params = params.append('condominio', id);
    params = params.append('npp', '10');
    params = params.append('page', page);
    return this.http.get(environment.baseUrl + environment.api.access, { headers, params});
    // return this.http.get('../../assets/data/user.json');

  }
}
