import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';

const URL = environment.server;

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  public page = 1;
  private limit = 3;

  constructor(private http: HttpClient) {}

  getAllHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${URL}/heroes`);
  }

  getHeroesPagination(): Observable<Heroe[]> {
    localStorage.setItem('limit', this.limit.toString());

    return this.http.get<Heroe[]>(
      `${URL}/heroes?_page=${this.page}&_limit=${this.limit}`
    );
  }

  getHeroeId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${URL}/heroes/${id}`);
  }

  getBuscarHeroe(texto: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${URL}/heroes?superhero_like=${texto}`);
  }

  getPaginationPrevious(atras: number) {
    this.page = this.page - atras;

    if (this.page === 1) {
      localStorage.setItem('valor', 'detener');
    }

    return this.http.get<Heroe[]>(
      `${URL}/heroes?_page=${this.page}&_limit=${this.limit}`
    );
  }

  getPaginationNext(adelante: number) {
    this.page = this.page + adelante;

    return this.http.get<Heroe[]>(
      `${URL}/heroes?_page=${this.page}&_limit=${this.limit}`
    );
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${URL}/heroes`, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${URL}/heroes/${heroe.id}`, heroe);
  }

  eliminarHeroe(id: string): Observable<Heroe> {
    return this.http.delete<Heroe>(`${URL}/heroes/${id}`);
  }
}
