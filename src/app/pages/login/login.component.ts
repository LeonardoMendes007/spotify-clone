import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from './../../services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly SpotifyService = inject(SpotifyService);
  private readonly Router = inject(Router);

  constructor(){

  }

  ngOnInit(): void {
    this.verificarTokenUrlCallback();
  }

  verificarTokenUrlCallback(){
    const token = this.SpotifyService.obterTokenUrlCallback();
    if(!!token)
      this.Router.navigateByUrl('player/home');
      
  }

  realizarLoginSpotify() {
    this.SpotifyService.loginSpotify();
  }
}
