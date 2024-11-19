import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService,
              private router: Router ) {}

  //
  //return this.http.post<{token: string, roles: string[]}>(this.url + "/user/login", {username, password})
  //.pipe(
  //  tap(response => {
  //        localStorage.setItem('token', response.token);
  //          localStorage.setItem('roles', JSON.stringify(response.roles));
  //            localStorage.setItem('authStatus', JSON.stringify(true));
  //          })
  //      );

  login(){
    this.loginService.login(this.username, this.password).subscribe({
      next: () => {
        // Redireciona para a página inicial após login bem-sucedido
        this.router.navigate(['/home']);
      },
      error: () => {
        // Exibe mensagem de erro em caso de falha
        this.errorMessage = 'Usuário ou senha inválidos';
      }
    });
  }
}
