import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:8080"
  constructor(private http: HttpClient, private router: Router) { }


  login(username: string, password: string): Observable<{token: string, roles: string[]}> {
    return this.http.post<{ token: string, roles: string[] }>(`${this.url}/user/login`, { username, password })
      .pipe(
        tap(response => {
          // Armazena as informações de autenticação no localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('roles', JSON.stringify(response.roles));
          localStorage.setItem('authStatus', JSON.stringify(true));
        })
      );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
