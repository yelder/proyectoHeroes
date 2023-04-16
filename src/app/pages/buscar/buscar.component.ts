import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from 'src/app/interfaces/heroes.interface';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit {
  heroes: Heroe[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesSvc: HeroesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.heroesSvc.getBuscarHeroe(param['texto']).subscribe((res) => {
        this.heroes = res;
      });
    });
  }
}
