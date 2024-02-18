import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import Spotify from 'spotify-web-api-js';
import { SpotifyConfiguration } from 'src/environments/environment';
import { SpotifyArtistaParaArtista, SpotifyPlaylistParaPlaylist, SpotifyTrackParaMusica, SpotifyUserParaUsuario } from '../Common/spotifyHelper';
import { IArtista } from '../interfaces/IArtista';
import { IMusica } from '../interfaces/IMusica';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private readonly spotifyApi: Spotify.SpotifyWebApiJs;
  private readonly router = inject(Router);

  usuario: IUsuario;

  constructor() { 
    this.spotifyApi = new Spotify();
  }

  loginSpotify(){
    window.location.href = this.obterUrlLogin();
  }

  async inicializarUsuario(){
    if(!!this.usuario){
      return true;
    }

    const token = localStorage.getItem('token');

    if(!token){
      return false;
    }
      
    try{

      this.definirAcessToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;

    }catch(ex){
      return false;
    }
  }

  async obterSpotifyUsuario(){
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserParaUsuario(userInfo);
  }

 
  obterTokenUrlCallback(){
    if(!window.location.hash){
      return false;
    }

    const params = window.location.hash.substring(1).split('&');
    return this.definirAcessToken(params[0].split('=')[1]);
  }

  private definirAcessToken(token: string){
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
    return token;
  }

  private obterUrlLogin(){
    const authEndPoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }

  async buscarPlaylistUsuario(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, { offset, limit });
    return playlists.items.map( x => SpotifyPlaylistParaPlaylist(x));
  }

  async buscarTopArtistas(limit = 10): Promise<IArtista[]>{
    const artistas = await this.spotifyApi.getMyTopArtists({limit});

    return artistas.items.map(SpotifyArtistaParaArtista);
  }

  async buscarMusicas(offset = 0, limit = 50): Promise<IMusica[]>{
    const musicas = await this.spotifyApi.getMySavedTracks({offset,limit});
    console.log(musicas);
    return musicas.items.map(x => SpotifyTrackParaMusica(x.track));
  }

  async executarMusica(musicaId: string){
    await this.spotifyApi.queue(musicaId);
    await this.spotifyApi.skipToNext();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
