import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Owner } from '../../models/owner';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OwnerService } from '../../services/owner.service';
import { Pet } from '../../models/pet';
import { Pettype } from '../../models/pettype';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-specialty-add',
  imports: [FormsModule],
  templateUrl: './specialty-add.component.html',
  styleUrl: './specialty-add.component.css'
})
export class SpecialtyAddComponent {

  public textBottom: string = "Add speciality";
  public spe: any = <any>{};
  @Input() speId: number = -1;
  @Input() speName: string = '';
  @Output() anadeModSpe = new EventEmitter<any>();
  @Output() cancelEdit = new EventEmitter<void>(); // Nuevo evento de cancelación

  constructor(private servicioPajax: OwnerService, private ruta: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("Este es el nombre de la especialidad", this.speName);
    console.log("Este es el id de la especialidad", this.speId);
    this.spe.name = this.speName; // Para añadir el nombre de la especialidad si lo tiene
    if (this.speId == -1) this.textBottom = "Add speciality";
    else this.textBottom = "Mod speciality";
  }

  onSubmit(form: any) {
    console.log("Esto es lo que mando del formulario de sepeciality", form);
    if (this.speId == -1) {
      console.log("Estoy añadiendo especialidad");
      this.servicioPajax.AnadeSpecialty(form).subscribe({
        next: res => { // Esto es lo que nos devuelve el servidor
          console.log("Respuesta al añadir petType", res);
          this.anadeModSpe.emit(res);
        },
        error: error => console.log("Esto es un error cabezón", error)
      });
    } else {
      form.id = this.speId;
      console.log("este es el nuevo nombre al modificar pettype", form);
      this.servicioPajax.ModificaSpecialty(form).subscribe({
        next: res => { // Esto es lo que nos devuelve el servidor
          console.log("Respuesta al Modificar petType", res);
          this.anadeModSpe.emit(form);
        },
        error: error => console.log("Esto es un error cabezón", error)
      });
    }
  }

  cancel() {
    this.cancelEdit.emit(); // Emitir el evento de cancelación
    this.ruta.navigate(['/speciality-list']); // Navegar a la ruta principal o la ruta deseada
  }
}
