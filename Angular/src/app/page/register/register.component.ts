import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = { username: '', password: '', role: 'ROLE_USER' }; // Defina um valor padrão para o role
  message = '';

  constructor(private userService: UserService, private _router: Router) {}

  registerUser() {
    this.userService.register(this.user).subscribe(
      (response) => {
        if (response.status === 201) {
          this.message = 'Usuário cadastrado com sucesso!';
          setTimeout(() => {
            this._router.navigate(['/login']);
          }, 2000);
        }
      },
      (error) => {
        // Verifica se o erro tem status 201, o que significa sucesso com comportamento inesperado
        if (error.status === 201) {
          this.message = 'Usuário cadastrado com sucesso!';
          setTimeout(() => {
            this._router.navigate(['/login']);
          }, 2000);
        } else {
          this.message = 'Erro ao cadastrar usuário: ' + (error.error || error.message);
        }
      }
    );
  }

}
