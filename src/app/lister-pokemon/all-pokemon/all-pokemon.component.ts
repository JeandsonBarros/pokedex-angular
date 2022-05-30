import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ListPokemonService } from 'src/app/shared/list-pokemon.service';

@Component({
  selector: 'app-all-pokemons',
  templateUrl: './all-pokemon.component.html',
  styleUrls: ['./all-pokemon.component.scss']
})
export class AllPokemonComponent implements OnInit {

  title = ""

  pokemonsUrl: any = [];

  length = 100;
  pageSize = 20;
  pageIndex = 0
  pageSizeOptions: number[] = [10, 20, 30, 40];

  constructor(private listPokemonService: ListPokemonService) { }

  ngOnInit(): void {

    let titleTemp = "All Pokémon".split('');

    titleTemp.forEach((letra: any, i: number)=>{   
      
    setTimeout(() => {
       this.title += letra;
    }, 95 * i)

  });

    this.dataRenderOfPokemon(this.pageSize, this.pageIndex)
  }


  dataRenderOfPokemon(pageSize: number, pageIndex: number) {
    this.pokemonsUrl = []

    this.listPokemonService.getAllPokemon(pageSize, pageIndex * pageSize)
    .subscribe(response => {
     this.length = response.count
     
      response.results.forEach((pokemonUrl: { url: any }) => {
        this.pokemonsUrl.push(pokemonUrl.url)
      })
    })
  }

  setPageSizeOptions(event: any) {
  
    window.scrollTo(0, 0);
    let pageEvent: PageEvent = new PageEvent;
    pageEvent = event

    this.dataRenderOfPokemon(pageEvent.pageSize, pageEvent.pageIndex);
   
  }

}
