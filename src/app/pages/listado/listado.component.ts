import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { Heroe, Publisher } from 'src/app/interfaces/heroes.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  heroes: Heroe[] = [];
  adelante = 0;
  atras = 0;
  btnActivePre = true;
  btnActiveNe = false;
  noExiste = false;

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
    localStorage.removeItem('limit');
    localStorage.removeItem('valor');

    this.heroesSvc.getHeroesPagination().subscribe((res) => {
      this.heroes = res;
    });
  }

  paginarPrevious() {
    this.btnActiveNe = false;
    this.atras = 1;
    this.heroesSvc.getPaginationPrevious(this.atras).subscribe((res) => {
      this.heroes = res;

      if (localStorage.getItem('valor') === 'detener') {
        this.btnActivePre = true;
      }
    });
  }

  paginarNext() {
    this.adelante = 1;

    let limite = localStorage.getItem('limit');

    this.heroesSvc.getPaginationNext(this.adelante).subscribe((res) => {
      this.heroes = res;

      if (this.heroes.length !== Number(limite)) {
        this.noExiste = true;
        this.btnActiveNe = true;
      }
    });

    localStorage.removeItem('valor');
    this.btnActivePre = false;
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    this.heroesSvc.agregarHeroe(this.heroe).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        title: 'El heroe se guardo correctamente',
        confirmButtonText: 'ACEPTAR',
      }).then((result) => {
        if (result.value) {
          location.reload();
        }
      });
    });
  }

  eliminarHeroe(id: any) {
    Swal.fire({
      title: 'Desea eliminar el heroe?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.heroesSvc.eliminarHeroe(id).subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'El heroe se elimino correctamente',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            location.reload();
          });
        });
      }
    });
  }
}
