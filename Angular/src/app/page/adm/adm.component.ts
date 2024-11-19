import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-adm',
  standalone: true,
  imports: [],
  templateUrl: './adm.component.html',
  styleUrl: './adm.component.css'
})
export class AdmComponent {
  constructor(private _router: Router, private _service: AuthServiceService){}
  home(){
    this._router.navigate(['home'])
  }

  logout(){
    this._service.logout();
  }
}
