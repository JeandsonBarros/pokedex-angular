import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  name = "";

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.name = param["name"]

      fetch("https://pokeapi.co/api/v2/pokemon/"+this.name).then(response => {
        response.json().then(dataPokemon => console.log(dataPokemon))
      })
    
    })
  }

}
