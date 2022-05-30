import { ListerPokemonModule } from './../lister-pokemon/lister-pokemon.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AbilitiesComponent } from './abilities/abilities.component';
import { DescriptionComponent } from './description/description.component';
import { InformationRoutingModule } from './information-routing.module';
import { InformationComponent } from './information/information.component';
import { StatusComponent } from './status/status.component';
import { TypeComponent } from './type/type.component';
import { MovesComponent } from './moves/moves.component';
import { EvolutionComponent } from './evolution/evolution.component';


@NgModule({
  declarations: [
    InformationComponent,
    DescriptionComponent,
    TypeComponent,
    StatusComponent,
    AbilitiesComponent,
    MovesComponent,
    EvolutionComponent,
  ],
  imports: [
    CommonModule,
    InformationRoutingModule,
    MatCardModule,
    MatProgressBarModule,
    MatChipsModule,
    MatExpansionModule,
    ListerPokemonModule,
   
  ]
})
export class InformationModule { }
