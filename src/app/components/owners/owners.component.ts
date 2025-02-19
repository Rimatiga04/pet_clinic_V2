import { Component } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { CommonModule } from '@angular/common';
import { Owner } from '../../models/owner';
import { Pet } from '../../models/pet';
import { Router, RouterLink } from '@angular/router';
import { PetListComponent } from '../pet-list/pet-list.component';
import { ButtonModule } from 'primeng/button';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-owners',
  imports: [CommonModule, RouterLink, PetListComponent, ButtonModule],
  templateUrl: './owners.component.html',
  styleUrl: './owners.component.css'
})
export class OwnersComponent {
  

  public propietarios: Owner[] = [];//Creamos esta variable para meter ahí el resultado de la petición
  constructor(private servicioPajax: OwnerService, private ruta: Router) {}
  ngOnInit() {//Muy atento a esto también
    this.servicioPajax.getOwners().subscribe({
      //next y error hay que llamarlos así
      next: res => {//Esto es lo que nos devuleve el servidor
        console.log("Resultado que nois manda el servidor: ", res)
        this.propietarios = res;
        console.log("Estos osn los propietarios: ", this.propietarios)
      },
      error: error => console.log("Esto es un error cabezón")
    });//Así consumimos el servicio. Esto me devolverá un observable y tendré que suscribirme
  }

  deleteOwner(id: number, nombre: string) {
    console.log("El id a borrar", id);
    console.log("El nombre a borrar", nombre);
    if (confirm("¿Estas seguro de que quieres eliminar a " + nombre + "?")) {
      this.servicioPajax.deleteOwner(id).subscribe({
        //next y error hay que llamarlos así
        next: res => {//Esto es lo que nos devuleve el servidor
          console.log("Resultado que nois manda el servidor: ", res)
          this.propietarios = res;
          console.log("Estos osn los propietarios: ", this.propietarios)
        },
        error: error => console.log("Esto es un error cabezón")
      });//Así consumimos el servicio. Esto me devolverá un observable y tendré que suscribirme

    }

  }
}

