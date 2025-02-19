import { Component } from '@angular/core';
import { PettypeAddComponent } from '../pettype-add/pettype-add.component';
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
import { Pettype } from '../../models/pettype';
@Component({
  selector: 'app-pettype-list',
  imports: [PettypeAddComponent],
  templateUrl: './pettype-list.component.html',
  styleUrl: './pettype-list.component.css'
})
export class PettypeListComponent {
  public petTypes: Pettype[] = [];
  public det: boolean = false;
  public is_editando: number = -1;
  public petTypeName: string = "";//Para llevarme el nombre del tipo a editar
  constructor(private ownerService: OwnerService, private route: ActivatedRoute, private ruta: Router) { }

  ngOnInit() {//Muy atento a esto también
    this.ownerService.ListarPettypes().subscribe({
      //next y error hay que llamarlos así
      next: res => {//Esto es lo que nos devuleve el servidor
        console.log("Resultado de los tipos de pets: ", res)
        this.petTypes = res;

      },
      error: error => console.log("Esto es un error cabezón")
    });//Así consumimos el servicio. Esto me devolverá un observable y tendré que suscribirme
  }
  //Atentísisismo a esto
  visualizar(name?: string, id?: number) {//Puede tener un id o un nombre o no or eso le pongo ?
    if (id !== undefined) {
      this.is_editando = this.is_editando === id ? -1 : id;  // Alterna entre mostrar y ocultar el formulario para este tipo
    } else {
      this.det = !this.det;  // Alterna el formulario para añadir un nuevo tipo
    }
    this.petTypeName = name ?? '';  // Asigna el nombre del tipo de mascota si existe, si no, lo deja vacío
  }

  anadeModPetType(event: Pettype) {
    console.log("He añadio un pettype", event);
    if (this.is_editando === -1) {
      this.petTypes.push(event);
    } else {
      console.log("ya he modificado el petType");
      this.petTypes.find(e => e.id == event.id)!.name = event.name;//Esto atentísmo a ello y lo tengo en los apuntes de chat->Angular
    }
    //escondemos otra vez los formularios
    this.is_editando = -1;
    this.det = false;

  }

  borrarPetType(id: number) {

    this.ownerService.BorraPettype(id).subscribe({
      //next y error hay que llamarlos así
      next: res => {//Esto es lo que nos devuleve el servidor
        console.log("Resultado de borrar petType: ", res);

        this.petTypes = this.petTypes.filter(petType => petType.id !== id);

      },
      error: error => console.log("Esto es un error cabezón")
    });//Así consumimos el

  }
}
