import { Component, OnInit } from '@angular/core';
import { IBabyStroller } from 'src/app/core/interfaces';
import { StrollersService } from 'src/app/core/strollers.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  strollersCatalog!: IBabyStroller[];

  constructor(private strollersService: StrollersService) { }

  ngOnInit(): void {
    this.strollersService.loadStrollers$().subscribe(
      (strollersList) => this.strollersCatalog = strollersList
    )
  }

}
