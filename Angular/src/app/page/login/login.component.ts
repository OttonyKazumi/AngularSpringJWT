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
  login(){
    this.loginService.login(this.username, this.password).subscribe({
    next:(response: any) => {
      this.loginService.saveToken(response); // Armazena as credenciais
      localStorage.setItem('authStatus', JSON.stringify(true));
      this.router.navigate(['/profile']);
      }, error: (err) => {
        alert("Usuario e senha invalido")
      }
    })
  }
}
