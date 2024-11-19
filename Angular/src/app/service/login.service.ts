import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:8080"
  constructor(private http: HttpClient, private router: Router) { }


  login(username: string, password: string): Observable<string> {
    return this.http.post<string>(this.url + "/authenticate", { username, password }, { responseType: 'text' as 'json' });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  // Método para salvar o token
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Método para obter o token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
