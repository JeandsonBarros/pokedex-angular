import { Observable } from 'rxjs';
import { InformationPokemonService } from 'src/app/shared/information-pokemon.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.scss']
})
export class MovesComponent implements OnInit {

  @Input("url") url!: string;

  moves: any = []
  numberOfMoves = 0;

  constructor(private informationPokemonService :InformationPokemonService) { }

  ngOnInit(): void {

    this.informationPokemonService.getMoves(this.url).subscribe(moves => {
      this.numberOfMoves = moves.length;
    
      moves.slice(0,6).map((move: Observable<any>) => {
        move.subscribe(movePokemon => this.moves.push(movePokemon))
      })

    })
   
    this.moves = [];
    this.numberOfMoves = 0;

  }

  ngOnChanges(changes: SimpleChanges) {

    if (!changes['url'].firstChange) {
      this.moves = [];
      this.numberOfMoves = 0;
      this.ngOnInit();
    }
  }

  


}
