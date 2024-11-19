import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthServiceService} from "../../service/auth-service.service";
import {CardModule} from "primeng/card";
import {Button} from "primeng/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    CardModule,
    Button
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: any;
  role: any;


  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit(): void {

    this.authService.getUserDetails().subscribe({
      next: (data) => {
        console.log('User details:', data);
        this.user = data;
        this.role = this.user.authorities.map((auth: { authority: string }) => auth.authority);
      },
      error: (error) => {
        console.error('Erro ao obter detalhes do usuário:', error);
        if (error.status === 401) {
          alert('Autenticação falhou. Faça login novamente.');
        }
      },
    });
  }
  home(){
    this.router.navigate(['home'])
  }
}
