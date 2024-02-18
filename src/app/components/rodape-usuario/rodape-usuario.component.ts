import { Component, OnInit, inject } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { SpotifyService } from './../../services/spotify.service';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrls: ['./rodape-usuario.component.scss']
})
export class RodapeUsuarioComponent implements OnInit{
  
  private readonly spotifyService = inject(SpotifyService);

  sairIcone = faSignOutAlt;
  usuario: IUsuario;

  constructor(){

  }

  ngOnInit(): void {
    this.usuario = this.spotifyService.usuario;
  }

  logout(){
    this.spotifyService.logout();
  }

  
}
