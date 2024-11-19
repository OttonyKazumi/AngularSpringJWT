import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  constructor(private _router: Router, private _service: LoginService) {
  }

  adm() {
    this._router.navigate(['/admin']);
  }

  gerente(){
    this._router.navigate(['/gerente'])
  }

  profile(){
    this._router.navigate(['/profile']);
  }

  logout(){
    this._service.logout();
  }
}
