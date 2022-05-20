import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pokemons: any = [];
  
  length = 100;
  pageSize = 10;
  pageIndex = 0
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  constructor() { }

  ngOnInit(): void {
    this.dataRenderOfPokemon(this.pageSize, this.pageIndex)  
  }

  dataRenderOfPokemon(pageSize: number, pageIndex: number){
    this.pokemons = []

    fetch("https://pokeapi.co/api/v2/pokemon?limit="+pageSize+"&offset="+pageIndex*pageSize)
    .then(response => {

      response.json().then(data => {
        this.length = data.count

        data.results.forEach((namePok: { name: any, url: any }) => {
          this.getDataOfPokemon(namePok.url).then(respnse => {
            this.pokemons.push(respnse)
          })
        })
      })
    })
  }

  async getDataOfPokemon(url: string) {

    let response = await fetch(url);
    let responseJSON = await response.json();
    let responseForms = await fetch(responseJSON.forms[0].url);
    let responseFormsJSON = await responseForms.json();

    let dataReturn = {
      id: responseFormsJSON.id,
      name: responseFormsJSON.pokemon.name,
      image: responseFormsJSON.sprites.front_default,
      url: responseFormsJSON.pokemon.url
    }

    return dataReturn;
  }

 
  setPageSizeOptions(event: any) {
    let pageEvent: PageEvent = new PageEvent;
    pageEvent = event

    this.dataRenderOfPokemon(pageEvent.pageSize, pageEvent.pageIndex);
    
  }

}
