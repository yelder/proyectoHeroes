import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { BuscarComponent } from './pages/buscar/buscar.component';


const routes:Routes = [

  {path:'heroes', component:HeroesComponent},
  {path:'listado', component:ListadoComponent},
  {path:':id', component:HeroeComponent},
  {path:'buscar/:texto', component:BuscarComponent},


  {path:'', pathMatch:'full', redirectTo:'/heroes' },
  {path:'**', pathMatch:'full', redirectTo:'/heroes' },


]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
