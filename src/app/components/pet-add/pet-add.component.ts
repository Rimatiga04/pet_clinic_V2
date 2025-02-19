import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Owner } from '../../models/owner';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OwnerService } from '../../services/owner.service';
import { Pet } from '../../models/pet';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-pet-add',
  imports: [FormsModule, RouterLink, SelectModule],
  templateUrl: './pet-add.component.html',
  styleUrl: './pet-add.component.css'
})
export class PetAddComponent {
  public pet: Pet = <Pet>{};
  public idOwner: number = -1;
  public typePet: string = "Type";
  public tipoPet: Pet[] = [];
  public idPet = -1;
  public valorForm: number;
  public owner: string = "";
  public textBottom: string = "Add pet";
  constructor(private servicioPajax: OwnerService, private ruta: Router, private route: ActivatedRoute) {
    this.valorForm = -1;
  }

  ngOnInit() {
    console.log("estas en pet-add");
    const nombre = this.route.snapshot.params["nombre"];
    const apellidos = this.route.snapshot.params["apellidos"];
    this.idPet = this.route.snapshot.params["idPet"];
    this.idOwner = this.route.snapshot.params["idOwner"];
    console.log("Este es el id del owner en pet-add", this.idOwner);
    this.owner = nombre + " " + apellidos;
    this.servicioPajax.listarPetTypes().subscribe({
      //next y error hay que llamarlos así
      next: res => {//Esto es lo que nos devuleve el servidor
        console.log("Resultado que nos manda el servidor en pet-add para los tipos de pets: ", res)
        this.tipoPet = res;

      },
      error: error => console.log("Esto es un error cabezón", error)
    });//Así consumimos el ser

    if (this.idPet == -1) {

      this.textBottom = "Add pet";

    } else {
      this.textBottom = "Modify pet";
      console.log("este es el id de la pet que mando del formualrio", this.idPet);
      this.servicioPajax.ObtenerPetId(this.idPet).subscribe({
        //next y error hay que llamarlos así
        next: res => {//Esto es lo que nos devuleve el servidor
          console.log("Resultado de obetenre pet por id ", res)
          //Estoy asignado al formulario los valores queme traigo del pet que je listado por Id
          this.pet = res;
          this.typePet = res.type.name;
          this.owner = res.owner.firstName + " " + res.owner.lastName;
          this.valorForm = res.type.id;//Esto es para que asigne el valor del tipo si no lo cambio y que no sea -1
        },
        error: error => console.log("Esto es un error cabezón")
      });//Así consumimos el ser


    }
  }

  onSubmit(pet: Pet) {

    console.log("Valor del valorForm", this.valorForm);
    console.log("este es el id de la pet que mando del formualrio", this.idPet);
    console.log("Lo que mando del formulario", pet)
    if (this.idPet == -1) {
      this.servicioPajax.AnadePet(this.idOwner, pet).subscribe({
        //next y error hay que llamarlos así
        next: res => {//Esto es lo que nos devuleve el servidor
          console.log("Resultado que nois manda el servidor: ", res)
          this.ruta.navigate(["/detalles", this.idOwner]);
          console.log("Estos osn los propietarios: ", this.tipoPet)
        },
        error: error => console.log("Esto es un error cabezón")
      });//Así consumimos el ser
    } else {
      console.log("Esto es lo que mando para modificar", pet);
      console.log("El id del owner", this.idOwner);
      this.servicioPajax.ModificaPet(this.idOwner, pet, this.idPet).subscribe({
        //next y error hay que llamarlos así
        next: res => {//Esto es lo que nos devuleve el servidor
          console.log("Resultado que nois manda el servidor: ", res)
          this.ruta.navigate(["/detalles", this.idOwner]);
          console.log("Estos osn los propietarios: ", this.tipoPet)
        },
        error: error => console.log("Esto es un error cabezón")
      });
    }

  }
  listarTiposPet(event: any) { }


}
