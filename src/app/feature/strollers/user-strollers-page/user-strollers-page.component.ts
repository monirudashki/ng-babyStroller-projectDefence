import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBabyStroller } from 'src/app/core/interfaces';
import { StrollersService } from 'src/app/core/strollers.service';

@Component({
  selector: 'app-user-strollers-page',
  templateUrl: './user-strollers-page.component.html',
  styleUrls: ['./user-strollers-page.component.css']
})
export class UserStrollersPageComponent implements OnInit {

  strollersCatalog!: IBabyStroller[]

  constructor(private strollersService: StrollersService , private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = this.activateRoute.snapshot.params['userId'];

    this.strollersService.loadUserStrollers$(userId).subscribe({
      next: (strollers) => {
        this.strollersCatalog = strollers;
      }
    })
  }
  
}
