import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isAutenticado: boolean = this.getAuthStatus();
  isAdmin: boolean = this.getAdminStatus();

  constructor(private router: Router, private http: HttpClient) {
  }

  login(username: string, password: string) {
    if (username && password) {
      if (username === 'admin' && password === 'admin') {
        this.setAuthState(true, true)
        this.router.navigate(['/dashboard']);
        return true;
      } else if (username === 'user' && password === 'user') {
        this.setAuthState(true, false)
        this.router.navigate(['/dashboard']);
        return true;
      }
    }
    return false;
  }

  logout(): void {
    localStorage.clear();
    this.setAuthState(false, false)
    this.router.navigate(['/']);
  }

  private setAuthState(authStatus: boolean, adminStatus: boolean): void {
    this.isAutenticado = authStatus;
    this.isAdmin = adminStatus;
    localStorage.setItem('authStatus', JSON.stringify(authStatus));
    localStorage.setItem('adminStatus', JSON.stringify(adminStatus));
  }

  getAuthStatus(): boolean {
    return JSON.parse(localStorage.getItem('authStatus') || 'false');
  }

  private getAdminStatus(): boolean {
    return JSON.parse(localStorage.getItem('adminStatus') || 'false');
  }

  getUserDetails() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
    });

    // Faz a chamada ao backend para obter os detalhes do usuário
    return this.http.get('http://localhost:8080/user/profile', { headers });
  }
}
