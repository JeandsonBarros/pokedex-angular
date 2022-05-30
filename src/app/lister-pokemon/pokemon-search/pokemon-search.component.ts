import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ListPokemonService } from 'src/app/shared/list-pokemon.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit {
  title = ""
  pokemonsUrl: any = []

  length = 100;
  pageSize = 20;
  pageIndex = 0
  pageSizeOptions: number[] = [10, 20, 30, 40];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private listPokemonService: ListPokemonService
  ) { }

  ngOnInit(): void {
    this.dataRenderOfPokemon(this.pageSize, this.pageIndex)
  }

  dataRenderOfPokemon(pageSize: number, pageIndex: number) {
    this.activatedRoute.params.subscribe(params => {

      if (params['search'] != '') {
        this.title = "Search for: "
        this.title += params['search'];

      } else {
        this.router.navigate(['']);
      }

      this.pokemonsUrl = []

      this.listPokemonService.findByName().subscribe(response => {
        this.pokemonsUrl = response.results.filter((pokemon: { name: any, url: any }) => {
          return pokemon.name.includes(params['search'].toLowerCase())
        }).slice(pageSize * pageIndex, (pageSize * pageIndex) + pageSize);

        this.length = response.results.filter((pokemon: { name: any, url: any }) => {
          return pokemon.name.includes(params['search'].toLowerCase())
        }).length
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
