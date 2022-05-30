import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListPokemonService {

  constructor(private httpClient: HttpClient) { }

  getAllPokemon(limit: number, offset: number): Observable<any>{
   return this.httpClient.get<any>("https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset);     
  }

  getFromType(type: string):Observable<any>{
    return this.httpClient.get<any>("https://pokeapi.co/api/v2/type/"+type);       
  }

  findByName():Observable<any>{
    return this.httpClient.get<any>("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
  }

  getPokemon(url: string):Observable<any>{
    return this.httpClient.get<any>(url);
  }
}
