import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchHiden = false;
  searchName = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
   
    if(filterValue!="")
      this.router.navigate(['pokemon/search/'+filterValue])
    else
      this.router.navigate([''])
  }

}
