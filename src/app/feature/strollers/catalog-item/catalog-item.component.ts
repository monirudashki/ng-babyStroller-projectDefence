import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IBabyStroller } from 'src/app/core/interfaces';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent implements OnInit {

  @Input() stroller!: IBabyStroller;

  isLogged$: Observable<boolean> = this.authService.isLogged$;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
