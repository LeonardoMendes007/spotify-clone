import { IArtista } from "../interfaces/IArtista";
import { IMusica } from "../interfaces/IMusica";

export function newArtista(): IArtista{
    return {
        id: '',
        nome: '',
        imageUrl: ''
    }
}

export function newMusica(): IMusica{
    return {
        id: '',
        album: {
            id: '',
            imageUrl: '',
            nome: ''
        },
        artistas: [],
        tempo: '',
        titulo: ''
    }
}