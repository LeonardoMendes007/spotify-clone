import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BotaoMenuComponent } from 'src/app/components/botao-menu/botao-menu.component';
import { PainelDireitoComponent } from 'src/app/components/painel-direito/painel-direito.component';
import { PainelEsquerdoComponent } from 'src/app/components/painel-esquerdo/painel-esquerdo.component';
import { RodapeUsuarioComponent } from 'src/app/components/rodape-usuario/rodape-usuario.component';
import { TopArtistaComponent } from 'src/app/components/top-artista/top-artista.component';
import { HomeComponent } from '../home/home.component';
import { PlayerComponent } from './player.component';
import { PlayerRotas } from './player.routes';



@NgModule({
  declarations: [
    PlayerComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    RodapeUsuarioComponent,
    HomeComponent,
    TopArtistaComponent,
    PainelDireitoComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(PlayerRotas)
  ]
})
export class PlayerModule { }
