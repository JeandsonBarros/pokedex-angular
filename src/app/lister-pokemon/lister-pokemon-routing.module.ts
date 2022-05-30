import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';
import { AllPokemonComponent } from './all-pokemon/all-pokemon.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonFromTypeComponent } from './pokemon-from-type/pokemon-from-type.component';

const routes: Routes = [
  {path: "", component: AllPokemonComponent},
  {path: "pokemon/type/:type", component: PokemonFromTypeComponent},
  {path: "pokemon/search/:search", component: PokemonSearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListerPokemonRoutingModule { }
