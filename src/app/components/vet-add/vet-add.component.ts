import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';//Esto es para poder utilizar formularios reactivos
import { Vet } from '../../models/vet';
import { OwnerService } from '../../services/owner.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-vet-add',
  imports: [ReactiveFormsModule],
  templateUrl: './vet-add.component.html',
  styleUrl: './vet-add.component.css'
})
export class VetAddComponent {
  public textBottom: string = "Añadir";
  public vet: Vet = <Vet>{};
  public spes: any[] = [];
  public valorForm: number[] = [];
  public tipoSpe: string = 'Especialidad';
  //Declaramos la variable form para el formulario
  public form: FormGroup;
  constructor(private servicio: OwnerService, private ruta: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    this.form = this.fb.group({
      //Declaramos los diferente campos del formulario
      id: this.fb.control('-1'),
      firstName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      lastName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      specialties: this.fb.control('', [Validators.required]),

    });

  }

  ngOnInit() {
    const idVet = this.route.snapshot.params["id"];
    if (idVet != -1) {
      console.log("Estoy modificando", idVet)
      this.textBottom = "Modificar";
      this.servicio.ObtenerVetId(idVet).subscribe({
        //next y error hay que llamarlos así
        next: res => {//Esto es lo que nos devuleve el servidor
          console.log("Resultado de obtener vet por id ",)
          //Atento a como cargo el formulario con patchValue 
          this.form.patchValue({
            id: res.id,
            firstName: res.firstName,
            lastName: res.lastName,
            specialties: res.specialties.map(spe => spe.id)
            /*specialties: res.specialties.map(function (spe) {
              return spe.id; // Mapea el id de cada especialidad directamente aquí
            }) // Convierte el array de objetos en un array de IDs*/
          });

          console.log("Formulario después de cargar datos:", this.form.value);

        },
        error: error => console.log("Esto es un error cabezón", error)
      });
    } else {
      this.textBottom = "Añadir";
      console.log("Estoy añadiendo");
    }

    this.servicio.ListarSpecialties().subscribe({
      //next y error hay que llamarlos así
      next: res => {//Esto es lo que nos devuleve el servidor
        console.log("Resultado de las especialidades: ", res)
        this.spes = res;

      },
      error: error => console.log("Esto es un error cabezón", error)
    });//Así consumimos el servicio. Esto me devolverá un observable y tendré que suscribirme



  }

  onSubmit() {
    this.form.value.specialties = this.form.value.specialties.map((id: number) => ({ id }));
    /*form.specialties.map(function(id: number) {
      return { id: id };
      }); Muy instersante la función map*/
    console.log("este es valor form", this.valorForm);
    console.log("Ahora este es el formualrio", this.form.value);
    if (this.form.value.id == -1) {
      this.servicio.AnadeVet(this.form.value).subscribe({
        //next y error hay que llamarlos así
        next: res => {//Esto es lo que nos devuleve el servidor
          console.log("Resultado de añadir Vet: ", res)
          this.ruta.navigate(["/vets"]);

        },
        error: error => console.log("Esto es un error cabezón", error)
      });//Así consumimos el servicio. Esto me devolverá un observable y tendré que suscribirme
    } else {
      this.servicio.ModVeterinario(this.form.value).subscribe({
        //next y error hay que llamarlos así
        next: res => {//Esto es lo que nos devuleve el servidor
          console.log("Resultado de añadir Vet: ", res)
          this.ruta.navigate(["/vets"]);

        },
        error: error => console.log("Esto es un error cabezón", error)
      });


    }

  }
}
