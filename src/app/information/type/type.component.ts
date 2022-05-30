import { InformationPokemonService } from 'src/app/shared/information-pokemon.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

  @Input("url") url = '';
  type!: string[]
  weaknesses: any = []

  typeColors: any = {
    normal: "#FAEBD7",
    grass: "#7FFF00",
    poison: "#8A2BE2",
    fire: "#FF8C00",
    ice: "#00BFFF",
    water: "#00FFFF",
    electric: "#FFD700",
    psychic: "#FF69B4",
    flying: "#008B8B",
    bug: "#006400",
    rock: "#A9A9A9",
    fighting: "#B8860B",
    ground: "#8B4513",
    fairy: "#FFC0CB",
    ghost: "#663399",
    dragon: "#FF0000",
    dark: "#222222",
    unknown: "#F0FFF0",
    shadow: "#708090",
    steel: "#2F4F4F"
  }

  constructor(private informationPokemonService: InformationPokemonService) { }

  ngOnInit(): void {
    this.weaknesses = [];
    this.type = [];

    this.informationPokemonService.getType(this.url).subscribe(types => {

      let doubleDamageTo: any = []
      
      this.type = types.map((item: any) => {

        this.informationPokemonService.getWeaknesses(item.name).subscribe(weaknesses => {
         
          doubleDamageTo = doubleDamageTo.concat(weaknesses.damage_relations.double_damage_to.map((item: { name: any }) => {
            return item.name
          }))

          weaknesses.damage_relations.double_damage_from.forEach((name: { name: any; }) => {
            if (
              !this.weaknesses.includes(name.name)
              &&
              !this.type.includes(name.name)
              &&
              !doubleDamageTo.includes(name.name)
            )
              this.weaknesses.push(name.name)
          })

        })

        return item.name
      })

    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['url'].firstChange)
      this.ngOnInit();
  }

}
