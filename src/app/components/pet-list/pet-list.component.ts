import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Owner } from '../../models/owner';
import { Pet } from '../../models/pet';
import { OwnerService } from '../../services/owner.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { VisitListComponent } from '../visit-list/visit-list.component';
@Component({
  selector: 'app-pet-list',
  imports: [VisitListComponent, RouterLink],
  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.component.css'
})
export class PetListComponent {

  //public owner: Owner=<Owner>{};
  @Input() pets: Pet[] = []//Atento a como juego con el input
  @Input() owner: string = "";
  @Output() petDeleted = new EventEmitter<number>();  // Emitimos el ID de la pet eliminada de tipo number
  /*El hijo emite un evento con algún dato cuando ocurre algo importante (por ejemplo, eliminar una mascota).
  El componente padre escucha ese evento y responde ejecutando un método (por ejemplo, actualiza la lista de mascotas).*/
  constructor(private ownerService: OwnerService, private route: ActivatedRoute, private ruta: Router) { }

  ngOnInit() {
    console.log("este es el owner", this.owner);
    console.log("Estas son las pets que tengo en pet lists",this.pets)
  }

  BorraPet(petId: number, name: string) {
    console.log("El id del pet a borrar", petId);

    if (confirm("¿Estas seguro de que quieres eliminar a " + name + "?")) {

      this.ownerService.BorraPet(petId).subscribe({
        //next y error hay que llamarlos así
        next: res => {//Esto es lo que nos devuleve el servidor
          console.log("Respuesta del servidor al borrar pet: ", res)
          this.petDeleted.emit(petId);  // Emitimos el evento al padre

        },
        error: error => console.log("Esto es un error cabezón")
      });//Así consumimos el servicio. Esto me devolverá un observable y tendré que suscribirme


    }
  }

  
}
