import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { InformationPokemonService } from 'src/app/shared/information-pokemon.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  @Input("url") url = '';

  status: any = [];

  constructor(private informationPokemonService: InformationPokemonService) { }

  ngOnInit(): void {
    this.status = [];

    this.informationPokemonService.getStats(this.url).subscribe(response => {
      this.status = response;    
    })
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['url'].firstChange) 
      this.ngOnInit();   
  }
}
