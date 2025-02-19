import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Owner } from '../../models/owner';
import { Pet } from '../../models/pet';
import { OwnerService } from '../../services/owner.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Input } from '@angular/core';
import { Visit } from '../../models/visit';

@Component({
  selector: 'app-visit-list',
  imports: [RouterLink],
  templateUrl: './visit-list.component.html',
  styleUrl: './visit-list.component.css'
})
export class VisitListComponent {
@Input() visits:Visit[]=[];
@Input() owner:any="";


constructor(private servicioPajax:OwnerService, private ruta: Router){}
ngOnInit(){
  console.log("Estas son las visitas que tengo", this.visits);
  console.log("Este es el owner de la visita", this.owner.id);
  
}

BorraVisit(idVisit:number, fecha:Date){
  console.log("El id de la visita a borrar", idVisit);

  if (confirm("¿Estas seguro de que quieres eliminar la visita de la fecha " +fecha+ "?")) {

    this.servicioPajax.BorraVisit(idVisit).subscribe({
      //next y error hay que llamarlos así
      next: res => {//Esto es lo que nos devuleve el servidor
        console.log("Respuesta del servidor al borrar visit: ", res)
       
        this.visits = this.visits.filter(visit => visit.id !== idVisit); 
      },
      error: error => console.log("Esto es un error cabezón")
    });//Así consumimos el servicio. Esto me devolverá un observable y tendré que suscribirme


  }
  
}
}
