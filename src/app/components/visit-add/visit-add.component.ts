import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Owner } from '../../models/owner';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OwnerService } from '../../services/owner.service';
import { Pet } from '../../models/pet';
import { Visit } from '../../models/visit';
@Component({
  selector: 'app-visit-add',
  imports: [FormsModule, RouterLink],
  templateUrl: './visit-add.component.html',
  styleUrl: './visit-add.component.css'
})
export class VisitAddComponent {
  public visit: Visit = <Visit>{};
  public ownerPet: string = "";
  public birthDate: string = "";
  public tipoPet: string = "";
  public namePet: string = "";
  public ownerId:number = -1;
  public visitId:number = -1;

  constructor(private servicioPajax: OwnerService, private ruta: Router, private route: ActivatedRoute) { 
    this.visitId = -1;
  }
  

  ngOnInit() {

    this.ownerPet = this.route.snapshot.params["owner"];
    this.birthDate = this.route.snapshot.params["nacimiento"];
    this.ownerPet = this.route.snapshot.params["owner"];
    this.tipoPet = this.route.snapshot.params["tipo"];
    this.namePet = this.route.snapshot.params["nombre"];
    this.ownerId = this.route.snapshot.params["ownerId"];
    this.visitId = this.route.snapshot.params["id"]?? -1;
    console.log("Este es el id de visita",this.visitId);

  }
  onSubmit(form: Visit) {
    const idPet = this.route.snapshot.params["petId"];
    form.pet=idPet;
    console.log("Lo que mando del formulario", form)
    if(this.visitId == -1){
    this.servicioPajax.AnadeVisit(form).subscribe({
      
      next: res => {//Esto es lo que nos devuleve el servidor
        console.log("Resultado que nois manda el servidor: ", res)
        this.ruta.navigate(["/detalles", this.ownerId]);
        console.log("Estos osn los propietarios: ", this.tipoPet)
      },
      error: error => console.log("Esto es un error cabezón")
    
    });//Así consumimos el ser
  }else{console.log("estoy editando la visita")}

  }
}
