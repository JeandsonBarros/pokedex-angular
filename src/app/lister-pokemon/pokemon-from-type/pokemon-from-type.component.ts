import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ListPokemonService } from 'src/app/shared/list-pokemon.service';

@Component({
  selector: 'app-pokemon-from-type',
  templateUrl: './pokemon-from-type.component.html',
  styleUrls: ['./pokemon-from-type.component.scss']
})
export class PokemonFromTypeComponent implements OnInit {
  title = ""

  pokemonsUrl: any = [];

  length = 100;
  pageSize = 20;
  pageIndex = 0
  pageSizeOptions: number[] = [10, 20, 30, 40];

  constructor(
    private activatedRoute: ActivatedRoute,
    private listPokemonService: ListPokemonService

    ) { }

  ngOnInit(): void {
    this.dataRenderOfPokemon(this.pageSize, this.pageIndex)
  }

  dataRenderOfPokemon(pageSize: number, pageIndex: number) {
   
    this.activatedRoute.params.subscribe(params => {
      this.title = ""
      this.pokemonsUrl = [];

      this.listPokemonService.getFromType(params["type"]).subscribe(response => {
        
        this.length = response.pokemon.length

        let titleTemp =  
        this.length>0? 
        ( params["type"][0].toUpperCase() + params["type"].substring(1)+" type pokémon").split('')
         : 
        ( params["type"][0].toUpperCase() + params["type"].substring(1)+" type pokémon, unavailable").split('')

        titleTemp.forEach((letra: any, i: number)=>{   
  
          setTimeout(() => {
             this.title += letra;
          }, 95 * i)
        });

        this.pokemonsUrl = response.pokemon.map((item: {pokemon: any})=>{
          return item.pokemon.url
        }).slice(pageSize*pageIndex, (pageSize*pageIndex)+pageSize);
        
      })
    })
  }

  setPageSizeOptions(event: any) {
    let pageEvent: PageEvent = new PageEvent;
    pageEvent = event
    window.scrollTo(0, 0);
    this.dataRenderOfPokemon(pageEvent.pageSize, pageEvent.pageIndex);
   
  }

}
