import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListerPokemonRoutingModule } from './lister-pokemon-routing.module';
import { AllPokemonComponent } from './all-pokemon/all-pokemon.component';
import { PokemonFromTypeComponent } from './pokemon-from-type/pokemon-from-type.component';
import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CardTitleComponent } from './card-title/card-title.component';


@NgModule({
  declarations: [
    AllPokemonComponent,
    PokemonFromTypeComponent,
    PokemonSearchComponent,
    PokemonCardComponent,
    CardTitleComponent
  ],
  imports: [
    CommonModule,
    ListerPokemonRoutingModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule
  ],
  exports:[PokemonCardComponent]
})
export class ListerPokemonModule { }
