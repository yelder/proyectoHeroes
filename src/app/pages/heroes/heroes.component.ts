import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from 'src/app/interfaces/heroes.interface';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Heroe[] = [];
  heroePublisher: any;

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },

    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    description: '',
    alt_img: '',
  };

  constructor(private heroesSvc: HeroesService) {}

  ngOnInit(): void {
    this.heroesSvc.getAllHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  updateHeroe(oHeroe: Heroe) {
    this.heroePublisher = oHeroe.publisher;

    this.heroe = oHeroe;
  }

  guardar() {
    this.heroesSvc.actualizarHeroe(this.heroe).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: 'El heroe se actualizo correctamente',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.value) {
          location.reload();
        }
      });
    });
  }
}
