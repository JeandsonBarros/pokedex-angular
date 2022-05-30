import { HttpClient } from '@angular/common/http';
import { map, mergeMap, Observable, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class InformationPokemonService {

  constructor(private httpClient: HttpClient) { }

  getDescription(url: string): Observable<any> {

    return this.httpClient.get<any>(url).pipe(

      mergeMap(pokemon => {

        return this.httpClient.get<any>(pokemon.species.url).pipe(
          map(description => {

            let descriptionText = description.flavor_text_entries.filter((item: { language: { name: any; }; }) => {
              return item.language.name == "en";
            })[0].flavor_text;

            return {
              id: pokemon.id,
              name: pokemon.name[0].toUpperCase() + pokemon.name.substring(1),
              imageUrl: pokemon.sprites.other.home.front_default,
              description: descriptionText,
              weight: pokemon.weight,
              height: pokemon.height
            }
          })
        )

      })
    );



  }

  getStats(url: string): Observable<any> {

    return this.httpClient.get<any>(url).pipe(
      map(pokemon => {
        return pokemon.stats.map((item: any) => {
          return { baseStat: item.base_stat, name: item.stat.name }
        })
      })
    )
  }

  getType(url: string): Observable<any> {
    return this.httpClient.get<any>(url).pipe(
      map(pokemon => {
        return pokemon.types.map((types: any) => {
          return types.type
        })
      })
    )
  }

  getWeaknesses(type: string): Observable<any> {
    return this.httpClient.get<any>("https://pokeapi.co/api/v2/type/" + type)
  }

  getMoves(url: string): Observable<any> {

    return this.httpClient.get<any>(url).pipe(
      map(pokemon => {

        return pokemon.moves.map((moves: any) => {

          return this.httpClient.get<any>(moves.move.url).pipe(
            map(move => {
              let texts = move.flavor_text_entries.filter((item: { flavor_text: any, language: any }) => {
                return item.language.name == "en";
              })[0].flavor_text

              return { name: moves.move.name, description: texts };
            })
          )
        })

      })
    )
  }

  getAbilities(url: string): Observable<any> {

    return this.httpClient.get<any>(url).pipe(
      map(abilities => {

        return abilities.abilities.map((ability: any) => {

          return this.httpClient.get<any>(ability.ability.url).pipe(

            map(abilityPokemon => {

              let texts = abilityPokemon.flavor_text_entries.filter((item: { flavor_text: any, language: any }) => {
                return item.language.name == "en";
              })[0].flavor_text;

              return { name: abilityPokemon.name, description: texts }
            })
          )
        });
      })
    )
  }

  getEvolution(url: string): Observable<any> {
    
    return this.httpClient.get<any>(url).pipe(
      switchMap(pokemon => {
        return this.httpClient.get<any>(pokemon.species.url)
      }),
      switchMap(pokemonSpecies => {
        return this.httpClient.get<any>(pokemonSpecies.evolution_chain.url)
      })

    )
  }
}