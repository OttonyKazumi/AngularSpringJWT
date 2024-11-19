import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private _router: Router, private _service: AuthServiceService){}

  home(){
    this._router.navigate(['home'])
  }

  logout(){
    this._service.logout();
  }

}
