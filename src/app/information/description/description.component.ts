import { InformationPokemonService } from './../../shared/information-pokemon.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  @Input("url") url = '';
 
  description: any = {
    id: 0,
    name: "",
    imageUrl: "",
    description: "",
    weight: 0,
    height: 0
  };
 
  constructor(private informationPokemonService: InformationPokemonService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
   
    this.informationPokemonService.getDescription(this.url).subscribe(response => {
      this.description = response
      
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['url'].firstChange)
      this.ngOnInit();
  }

}
