import { Component } from '@angular/core';
import { OwnerService } from '../../services/owner.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SpecialtyAddComponent } from '../specialty-add/specialty-add.component';
@Component({
  selector: 'app-specialty-list',
  imports: [SpecialtyAddComponent],
  templateUrl: './specialty-list.component.html',
  styleUrl: './specialty-list.component.css'
})
export class SpecialtyListComponent {
  public espes:any[]=[];
  public visualiza:boolean=false;
  public is_editando:number = -1;
  public nameSpe:string = '';
  constructor(private ownerService: OwnerService, private route: ActivatedRoute, private ruta: Router){}

ngOnInit(){
  this.ownerService.ListarSpecialties().subscribe({
    //next y error hay que llamarlos así
    next: res => {//Esto es lo que nos devuleve el servidor
      console.log("Resultado de las especialidades: ", res)
      this.espes = res;

    },
    error: error => console.log("Esto es un error cabezón",error)
  });//Así consumimos el servicio. Esto me devolverá un observable y tendré que suscribirme

}

visualizar(id?:number,name?:string){
  /*if(id!=undefined){
    this.is_editando = this.is_editando === id ? -1 : id;//Esto es para que, cuando le dé otra vez, se vuelva a poner en -1 para añadir
  }
  this.nameSpe = name ?? '';
  this.visualiza=!this.visualiza;*/
  if (id != undefined) {
    this.is_editando = this.is_editando === id ? -1 : id; // Toggle between edit and add
    this.nameSpe = name ?? '';
  } else {
    // If "Add" button is clicked, reset everything
    this.is_editando = -1;
    this.nameSpe = '';
  }
  this.visualiza = !this.visualiza;
}

anadeModSpe(form:any){
  console.log("He añadio una especialidad", form);
  if (this.is_editando === -1) {
    this.espes.push(form);
  } else {
    console.log("ya he modificado la especialidad");
    this.espes.find(e => e.id == form.id)!.name = form.name;//Esto atentísmo a ello y lo tengo en los apuntes de chat->Angular
  }
  //escondemos otra vez los formularios
  this.is_editando = -1;
  this.visualiza = false;
}

BorraSpecialty(idSpe:number, nameSpe:string){
  console.log("El id de la especialidad a borrar", idSpe);

  if (confirm("¿Estas seguro de que quieres eliminar la especialidad " +nameSpe+ "?")) {

    this.ownerService.BorraSpecialty(idSpe).subscribe({
      //next y error hay que llamarlos así
      next: res => {//Esto es lo que nos devuleve el servidor
        console.log("Respuesta del servidor al borrar especialidad: ", res)
       
        this.espes = this.espes.filter(espe => espe.id !== idSpe); 
      },
      error: error => console.log("Esto es un error cabezón", error)
    });//Así consumimos el servicio. Esto me devolverá un observable y tendré que suscribirme


  }
}
}
