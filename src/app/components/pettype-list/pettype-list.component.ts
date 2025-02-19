import { Component } from '@angular/core';
import { PettypeAddComponent } from '../pettype-add/pettype-add.component';
import { ActivatedRoute } from '@angular/router';
import { OwnerService } from '../../services/owner.service';
import { Router } from '@angular/router';
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
  public petTypeName: string = ""; // Para llevarme el nombre del tipo a editar

  constructor(private ownerService: OwnerService, private route: ActivatedRoute, private ruta: Router) { }

  ngOnInit() {
    this.ownerService.ListarPettypes().subscribe({
      next: res => {
        console.log("Resultado de los tipos de pets: ", res);
        this.petTypes = res;
      },
      error: error => console.log("Esto es un error cabezón")
    });
  }

  visualizar(name?: string, id?: number) {
    if (id !== undefined) {
      this.is_editando = this.is_editando === id ? -1 : id; // Alterna entre mostrar y ocultar el formulario para este tipo
    } else {
      this.det = !this.det; // Alterna el formulario para añadir un nuevo tipo
    }
    this.petTypeName = name ?? ''; // Asigna el nombre del tipo de mascota si existe, si no, lo deja vacío
  }

  anadeModPetType(event: Pettype) {
    console.log("He añadio un pettype", event);
    if (this.is_editando === -1) {
      this.petTypes.push(event);
    } else {
      console.log("ya he modificado el petType");
      this.petTypes.find(e => e.id == event.id)!.name = event.name;
    }
    // Escondemos otra vez los formularios
    this.is_editando = -1;
    this.det = false;
  }

  cancelarEdicion() {
    this.is_editando = -1;
    this.det = false;
  }

  borrarPetType(id: number) {
    this.ownerService.BorraPettype(id).subscribe({
      next: res => {
        console.log("Resultado de borrar petType: ", res);
        this.petTypes = this.petTypes.filter(petType => petType.id !== id);
      },
      error: error => console.log("Esto es un error cabezón")
    });
  }
}
