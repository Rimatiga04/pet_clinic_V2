import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Owner } from '../../models/owner';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OwnerService } from '../../services/owner.service';
@Component({
  selector: 'app-form-owner',
  imports: [FormsModule, RouterLink],
  templateUrl: './form-owner.component.html',
  styleUrl: './form-owner.component.css'
})
export class FormOwnerComponent {
  public propietario: Owner = <Owner>{};
  public textBottom: string = "Añadir";
  constructor(private servicioPajax: OwnerService, private ruta: Router, private route: ActivatedRoute) {
    this.propietario.id = -1;
    this.textBottom="Añadir";
  }
  ngOnInit() {
    const propId = this.route.snapshot.params["id"];
    console.log("este es el propietario a editar", propId);
    if (propId == -1) {

      this.textBottom = "Añadir";

    } else {
      this.textBottom = "Modificar"
      this.propietario.id = propId;
      this.servicioPajax.ObtenerOwnerId(propId).subscribe({
        next: (res) => {
          console.log("Esto es lo que recibo de selPersonaID", res);
          this.propietario = res;
        },
        error: (error) => console.log("Esto es un error de selPersonaID")


      })


    }


  }

  onSubmit(owner: Owner) {

    //console.log("Valores", this.persona);//form es lo que tengo en el formulario y this.persona es el objeto que he creado. Saber la diferencia
    console.log("Este es el propietario que mando", owner);
    //console.log("esta es la persona que mando al darle a enviar");
    if (this.propietario.id == -1) {
      this.servicioPajax.insertOwner(owner).subscribe({//Muy atento a que tenemos que navegar dentro del suscribe porque es un callback

        next: (res) => {
          console.log("Esto es lo que recibo de selPersonaID", res);
          this.ruta.navigate(["/"]);
        },
        error: (error) => console.log("Esto es un error de insertOwner", error)
      }
      );
    } else {
      console.log("Este es el pripietario a modificar", this.propietario);
      this.servicioPajax.modifyOwner(this.propietario).subscribe({//Muy atento a que tenemos que navegar dentro del suscribe porque es un callback

        next: (res) => {
          console.log("Esto es lo que recibo al modificar propietario", res);
          this.ruta.navigate(["/"]); //Esto te lleva a listar los owners y el de debajo a la lisat de detalles
          //this.ruta.navigate(["detalles",this.propietario.id]);

        },
        error: (error) => console.log("Esto es un error de modifyOwner", error)
      }
      );
    }
  }


}


