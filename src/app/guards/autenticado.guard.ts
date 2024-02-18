import { Injectable, inject } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticadoGuard implements CanLoad {

  private readonly router = inject(Router);
  private readonly spotifyService = inject(SpotifyService);
  usuario: any;

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token = localStorage.getItem('token');

    if(!token){
      return this.naoAutheticado();
    }

    return new Promise( async (res)=>{
      const usuarioCriado = await this.spotifyService.inicializarUsuario();
      if(!!usuarioCriado){
        res(true);
      }else{
        res(this.naoAutheticado());
      }
    });
      
  }

  naoAutheticado(){
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }
}
