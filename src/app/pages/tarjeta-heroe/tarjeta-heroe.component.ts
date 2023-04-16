import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Heroe } from 'src/app/interfaces/heroes.interface';

@Component({
  selector: 'app-tarjeta-heroe',
  templateUrl: './tarjeta-heroe.component.html',
  styleUrls: ['./tarjeta-heroe.component.css'],
})
export class TarjetaHeroeComponent {
  @Input() heroe!: Heroe;

  @Output() editarHeroe: EventEmitter<Heroe> = new EventEmitter();

  editHeroe() {
    this.editarHeroe.emit(this.heroe);
  }
}
