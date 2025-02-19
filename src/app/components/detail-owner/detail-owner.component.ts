import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Owner } from '../../models/owner';
import { Pet } from '../../models/pet';
import { OwnerService } from '../../services/owner.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { PetListComponent } from '../pet-list/pet-list.component';
@Component({
  selector: 'app-detail-owner',
  imports: [RouterLink, PetListComponent],
  templateUrl: './detail-owner.component.html',
  styleUrl: './detail-owner.component.css'
})
export class DetailOwnerComponent {

  public owner: Owner = <Owner>{};
  public idProp: number = -1;
  constructor(private ownerService: OwnerService, private route: ActivatedRoute, private ruta: Router) {

  }
  ngOnInit() {
    this.idProp = this.route.snapshot.params["id"];

    console.log("Este es el id del propietario", this.idProp);
    this.ownerService.ObtenerOwnerId_Pets(this.idProp).subscribe({
      next: (res) => {
        console.log("Esto es lo que recibo de ObtenerOwnerId_Pets", res);
        this.owner = res;
      },
      error: (error) => console.log("Esto es un error de selPersonaID")


    })

  }
  //Revibimos aquí el evento que hemos emitido en el hijo al borrar la pet
  petBorrada(idPet: number) {
    console.log(`Mascota con ID ${idPet} eliminada`);
    this.owner.pets = this.owner.pets.filter(pet => pet.id !== idPet);  // Actualizamos la lista de mascotas en el componente padre
    /*Es lo mismo que esto this.owner.pets = this.owner.pets.filter(function(pet) {
  return pet.id !== idPet;});*/
  }

  borrarOwner(id: number, nombre: string) {

    console.log("El id a borrar", id);

    if (confirm("¿Estas seguro de que quieres eliminar a " + nombre + "?")) {
      if (this.owner.pets.length <= 0) {//Atento a esto para saber si puebo borrar un owner o no.
        this.ownerService.deleteOwner(id).subscribe({
          //next y error hay que llamarlos así
          next: res => {//Esto es lo que nos devuleve el servidor
            console.log("Resultado que nois manda el servidor: ", res)

            this.ruta.navigate(["/"]);
          },
          error: error => console.log("Esto es un error cabezón")
        });//Así consumimos el servicio. Esto me devolverá un observable y tendré que suscribirme

      } else alert("No puedes borrar este owner porque contien pets");

    }
  }

}
