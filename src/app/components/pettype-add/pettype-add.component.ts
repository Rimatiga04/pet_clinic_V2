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
  selector: 'app-pettype-add',
  imports: [FormsModule],
  templateUrl: './pettype-add.component.html',
  styleUrl: './pettype-add.component.css'
})
export class PettypeAddComponent {
  public textBottom:string="Add Type";
  public petType:Pettype=<Pettype>{};
  @Input() petTypeId:number=0;
  @Input() petTypeName:string='';
  @Output() anadeModPetType = new EventEmitter<Pettype>();

   constructor(private servicioPajax: OwnerService, private ruta: Router, private route: ActivatedRoute) { 
      
    }

    ngOnInit(){
      //console.log("esto es id_editando ", this.petTypeId);
      //console.log("Esto es el nombre del petType que edito ", this.petTypeName);
      this.petType.name=this.petTypeName;//Si está vació, se queda vacío
      if(this.petTypeId == -1)this.textBottom="Add type";
      else this.textBottom="Mod type";
      
      }

    
      


    onSubmit(form:Pettype){
      console.log("Esto es lo que mando del formulario ", form);
      if(this.petTypeId == -1){
      this.servicioPajax.AnadePettype(form).subscribe({
        
        next: res => {//Esto es lo que nos devuleve el servidor
          console.log("Respuesta al añadir petType", res);
          this.anadeModPetType.emit(res);
          
        },
        error: error => console.log("Esto es un error cabezón", error)
      });//Así consumimos el ser
    }else{ 
      form.id=this.petTypeId;
      console.log("este es el nuevo nombre al modificar pettype", form);
      this.servicioPajax.ModificaPettype(form).subscribe({
        
        next: res => {//Esto es lo que nos devuleve el servidor
          console.log("Respuesta al Modificar petType", res);
          this.anadeModPetType.emit(form);
          
        },
        error: error => console.log("Esto es un error cabezón", error)
      });

    }
  }
}
