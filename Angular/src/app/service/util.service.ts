import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private url = "http://localhost:8080"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  dashboard(): Observable<string>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + token
    });


    return this.http.get(this.url + "/api", {headers, responseType: "text"});
  }

  adm(){
    const token = JSON.parse(localStorage.getItem('token') || '');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + token
    });

    this.http.get(this.url + "/api/adm", {headers});
  }

  user(){
    const token = JSON.parse(localStorage.getItem('token') || '');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + token
    });

    this.http.get(this.url + "/api/user", {headers});
  }

  profile(){
    const token = JSON.parse(localStorage.getItem('token') || '');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + token
    });

    this.http.get(this.url + "/api/profile", {headers});
  }

  // Novo método para obter a lista de usuários
  getUserList() {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(this.url + "/user/user-list", { headers });
  }
}
