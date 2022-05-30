import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
 
  constructor() { }

  types!: string[]

  ngOnInit(): void {

    fetch("https://pokeapi.co/api/v2/type").then(response => {
      response.json().then(types => {
        

        this.types = types.results.map((type: { name: string }) => {
          return type.name
        })

      })
    })
  }


}
