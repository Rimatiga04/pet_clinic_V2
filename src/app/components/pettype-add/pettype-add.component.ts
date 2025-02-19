import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OwnerService } from '../../services/owner.service';
import { Pettype } from '../../models/pettype';

@Component({
  selector: 'app-pettype-add',
  imports: [FormsModule],
  templateUrl: './pettype-add.component.html',
  styleUrl: './pettype-add.component.css'
})
export class PettypeAddComponent {
  public textBottom: string = "Add Type";
  public petType: Pettype = <Pettype>{};
  @Input() petTypeId: number = 0;
  @Input() petTypeName: string = '';
  @Output() anadeModPetType = new EventEmitter<Pettype>();
  @Output() cancelEdit = new EventEmitter<void>(); // Nuevo evento de cancelación

  constructor(private servicioPajax: OwnerService, private ruta: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.petType.name = this.petTypeName; // Si está vació, se queda vacío
    if (this.petTypeId == -1) this.textBottom = "Add type";
    else this.textBottom = "Mod type";
  }

  onSubmit(form: Pettype) {
    console.log("Esto es lo que mando del formulario ", form);
    if (this.petTypeId == -1) {
      this.servicioPajax.AnadePettype(form).subscribe({
        next: res => {
          console.log("Respuesta al añadir petType", res);
          this.anadeModPetType.emit(res);
        },
        error: error => console.log("Esto es un error cabezón", error)
      });
    } else {
      form.id = this.petTypeId;
      console.log("este es el nuevo nombre al modificar pettype", form);
      this.servicioPajax.ModificaPettype(form).subscribe({
        next: res => {
          console.log("Respuesta al Modificar petType", res);
          this.anadeModPetType.emit(form);
        },
        error: error => console.log("Esto es un error cabezón", error)
      });
    }
  }

  cancel() {
    this.cancelEdit.emit(); // Emitir el evento de cancelación
    this.ruta.navigate(['/pettype']); // Navegar a la ruta principal o la ruta deseada
  }
}
