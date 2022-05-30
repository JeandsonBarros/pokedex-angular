import { Component, Input, OnInit } from '@angular/core';
import { InformationPokemonService } from 'src/app/shared/information-pokemon.service';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.scss']
})
export class EvolutionComponent implements OnInit {

  @Input("url") url = '';
  names: any = [];

  constructor(private informationPokemonService: InformationPokemonService) { }

  ngOnInit(): void {

    this.informationPokemonService.getEvolution(this.url).subscribe(evolution => {

      this.names.push({ name: evolution.chain.species.name, number: 1 })

      let evo = evolution.chain.evolves_to;

      if (evo.length > 0) {

        evo.forEach((element: any) => {

          this.names.push({ name: element.species.name, number: 2 })

          if (element.evolves_to.length > 0) {
            element.evolves_to.forEach((elementEvo: any) => {

              this.names.push({ name: elementEvo.species.name, number: 3 })
            });
          }
        });
      }

    })
  }
}
