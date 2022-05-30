import { Component, Input, OnInit } from '@angular/core';
import { ListPokemonService } from 'src/app/shared/list-pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Input("pokemonUrl") pokemonUrl = ""
  name = "Loading";
  urlImg = '/assets/img/loading.gif';
  numberId = 0;

  constructor(private listPokemonService: ListPokemonService) { }

  ngOnInit(): void { this.getDataOfPokemon() }

  getDataOfPokemon() {

    this.listPokemonService.getPokemon(this.pokemonUrl).subscribe(response => {
      this.numberId = response.id;
      this.name = response.name;
      this.urlImg = response.sprites.other.home.front_default;
    })   
  }

}
