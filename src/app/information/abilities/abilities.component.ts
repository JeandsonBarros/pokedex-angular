import { Observable } from 'rxjs';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { InformationPokemonService } from 'src/app/shared/information-pokemon.service';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrls: ['./abilities.component.scss']
})
export class AbilitiesComponent implements OnInit {

  @Input("url") url = '';

  abilities: any = []
  numberOfAbilities = 0

  constructor(private informationPokemonService: InformationPokemonService) { }

  ngOnInit(): void {
    this.abilities = []

    this.informationPokemonService.getAbilities(this.url).subscribe(abilities => {
      this.numberOfAbilities = abilities.length 

      abilities.map((abilityPokemon: Observable<any>)=>{    
        abilityPokemon.subscribe(ability => this.abilities.push(ability))
      })
      
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['url'].firstChange)
     this.ngOnInit();
  }

}
