
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: "",
    loadChildren: () => import("./lister-pokemon/lister-pokemon.module").then(m => m.ListerPokemonModule)
  },
  {
    path: "information",
    loadChildren: () => import("./information/information.module").then(m => m.InformationModule)
  }
 
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
