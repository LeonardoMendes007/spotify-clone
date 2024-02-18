import { Component, OnInit, inject } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { newArtista } from 'src/app/Common/factories';
import { IArtista } from 'src/app/interfaces/IArtista';
import { IMusica } from 'src/app/interfaces/IMusica';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  private readonly spotifyService = inject(SpotifyService);

  musicas: IMusica[] = [];

  artistaAtual: IArtista = newArtista();

  //IconPlay
  playIcone = faPlay;

  ngOnInit(): void {
    this.obterMusicas();
  }

  async obterMusicas() {
    this.musicas = await this.spotifyService.buscarMusicas();
    console.log(this.musicas);
  }

  obterArtistas(musica: IMusica){
    return musica.artistas.map( artista => artista.nome).join(', ');
  }

  async executarMusica(musica: IMusica){
    await this.spotifyService.executarMusica(musica.id);
  }

}
