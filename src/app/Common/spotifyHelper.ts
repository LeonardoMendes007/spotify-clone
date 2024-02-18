import { addMilliseconds, format } from "date-fns";
import { IArtista } from "../interfaces/IArtista";
import { IMusica } from "../interfaces/IMusica";
import { IPlaylist } from "../interfaces/IPlaylist";
import { IUsuario } from "../interfaces/IUsuario";

export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario {

    return {
        id: user.id,
        nome: user.display_name,
        imagemUrl: verificaImagem(user.images)
    }
}

export function SpotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
    
    return {
        id: playlist.id,
        nome: playlist.name,
        imagemUrl: verificaImagem(playlist.images)
    }
}

export function SpotifyArtistaParaArtista(spotifyArtista: SpotifyApi.ArtistObjectFull) : IArtista{
    return {
        id: spotifyArtista.id,
        imageUrl: verificaImagem(spotifyArtista.images.sort((a,b) =>  a.width - b.width )),
        nome: spotifyArtista.name
    }
}

export function SpotifyTrackParaMusica(spotifyTrack: SpotifyApi.TrackObjectFull) : IMusica{

    const msParaMinutos = (ms: number) => {
        const data = addMilliseconds(new Date(0), ms);
        return format(data, 'mm:ss');
    }

    return {
        id: spotifyTrack.uri,
        titulo: spotifyTrack.name,
        album: {
            id: spotifyTrack.album.id,
            imageUrl: spotifyTrack.album.images.shift().url,
            nome: spotifyTrack.album.name
        },
        artistas: spotifyTrack.artists.map(artista => ({
            id: artista.id,
            nome: artista.name
        })),
        tempo: msParaMinutos(spotifyTrack.duration_ms)
    }
}

function verificaImagem(images: any): string {

    if(images.length == 0){
        return '';
    }
    return images.pop().url;
}
