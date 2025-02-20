import { Component } from '@angular/core';
import { Vet } from '../../models/vet';
import { OwnerService } from '../../services/owner.service';
import { CommonModule } from '@angular/common';
import { Owner } from '../../models/owner';
import { Pet } from '../../models/pet';
import { Router, RouterLink } from '@angular/router';
import { PetListComponent } from '../pet-list/pet-list.component';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-vets',
  imports: [RouterLink],
  templateUrl: './vets.component.html',
  styleUrl: './vets.component.css'
})
export class VetsComponent {

   public vets: Vet[] = [];//Creamos esta variable para meter ahí el resultado de la petición
    constructor(private servicioPajax: OwnerService, private ruta: Router) {}
    ngOnInit() {//Muy atento a esto también
      this.servicioPajax.ListarVets().subscribe({
        //next y error hay que llamarlos así
        next: res => {//Esto es lo que nos devuleve el servidor
          console.log("Resultado que nois manda el servidor: ", res)
          this.vets = res;
          console.log("Estos osn los propietarios: ", this.vets)
        },
        error: error => console.log("Esto es un error cabezón")
      });//Así consumimos el servicio. Esto me devolverá un observable y tendré que suscribirme
    }
  
    deleteVet(id: number, nombre: string) {
      console.log("El id a borrar", id);
      console.log("El nombre a borrar", nombre);
      if (confirm("¿Estas seguro de que quieres eliminar a " + nombre + "?")) {
        this.servicioPajax.EliminarVet(id).subscribe({
          //next y error hay que llamarlos así
          next: res => {//Esto es lo que nos devuleve el servidor
            console.log("Resultado que nois manda el servidor: ", res)
            this.vets = res;
            console.log("Estos osn los propietarios: ", this.vets)
          },
          error: error => console.log("Esto es un error cabezón")
        });//Así consumimos el servicio. Esto me devolverá un observable y tendré que suscribirme
  
      }
  
    }

}
