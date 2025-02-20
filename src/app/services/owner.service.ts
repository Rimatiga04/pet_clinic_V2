import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Owner } from '../models/owner';
import { Pet } from '../models/pet';
import { Visit } from '../models/visit';
import { Vet } from '../models/vet';
import { Pettype } from '../models/pettype';
@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private url = environment.API_URL;//Así llamamos a la url si tener que escribirla entera

  constructor(private httpClient: HttpClient) { }//Muy importante ponerle el private

  getOwners() {
    console.log("Que pasa mi jarma. esramos en getOwners");
    let body = {
      accion: "ListarOwners"//Este es el atributo que tenemos en servicio (acordarse de poner el mismo npobre del atributo al objeto que pasas)
    };
    return this.httpClient.post<Owner[]>(this.url, body);


  }

  ListarVets() {
    console.log("estamos en listarVets");
    let body = {
      accion: "ListarVets"//Este es el atributo que tenemos en servicio (acordarse de poner el mismo npobre del atributo al objeto que pasas)
    };
    return this.httpClient.post<Vet[]>(this.url, body);


  }


  insertOwner(owner: Owner) {

    console.log("Estamos insertando a una personita");


    console.log("Pa", owner);

    let objOwner = {
      accion: "AnadeOwner",
      owner: owner
    }
    return this.httpClient.post(this.url, JSON.stringify(objOwner));//Así hemos tipado lo que nos devuleve. En este caso un array de Personas


  }

  ObtenerOwnerId(id: number) {
    console.log("Estamos insertando a una personita");


    console.log("Pa", id);

    let objOwner = {
      accion: "ObtenerOwnerId",
      id: id
    }
    return this.httpClient.post<Owner>(this.url, JSON.stringify(objOwner));

  }

  ObtenerVetId(id: number) {
    console.log("Obteniendo vet por id");


    console.log("Pa", id);

    let objOwner = {
      accion: "ObtenerVetId",
      id: id
    }
    return this.httpClient.post<Vet>(this.url, JSON.stringify(objOwner));

  }

  modifyOwner(owner: Owner) {
    console.log("Estamos insertando a una personita");


    console.log("Pa", owner);

    let objOwner = {
      accion: "ModificaOwner",
      owner: owner
    }
    return this.httpClient.post(this.url, JSON.stringify(objOwner));
  }

  ModificaPettype(petType: Pettype) {
    console.log("Estamos modificando un pettype");


    console.log("Pa", petType);

    let objOwner = {
      accion: "ModificaPettype",
      pettype: petType
    }
    return this.httpClient.post(this.url, objOwner);
  }

  ModificaSpecialty(spe: any) {
    console.log("Estamos modificando una especialidad");


    console.log("Esto meto a ModificaSpecialty ", spe);

    let objOwner = {
      accion: "ModificaSpecialty",
      specialty: spe
    }
    return this.httpClient.post<any>(this.url, objOwner);


  }



  deleteOwner(id: number) {
    console.log("Estamos borrando a un propietario con id", id);


    let objOwner = {
      accion: "BorraOwner",
      id: id,
      listado: "NO"//Atento a esto que me lo pide la Api
    }
    return this.httpClient.post<any>(this.url, objOwner);

  }

  BorraPet(idPet: number) {
    console.log("Estamos borrando a una pet con id", idPet);


    let objPet = {
      accion: "BorraPet",
      id: idPet,

    }
    return this.httpClient.post<any>(this.url, objPet);
  }

  BorraPettype(idPetType: number) {
    console.log("Estamos borrando a una pet con id", idPetType);


    let objPet = {
      accion: "BorraPettype",
      id: idPetType,

    }
    return this.httpClient.post<any>(this.url, objPet);
  }

  BorraVisit(idVisita: number) {

    console.log("Estamos borrando uan visita con id", idVisita);


    let objPet = {
      accion: "BorraVisit",
      id: idVisita,

    }
    return this.httpClient.post<any>(this.url, objPet);

  }

  BorraSpecialty(idSpe: number) {
    console.log("Estamos borrando una especialidad con id", idSpe);


    let objPet = {
      accion: "BorraSpecialty",
      id: idSpe,

    }
    return this.httpClient.post<any>(this.url, objPet);

  }



  listarPetTypes() {
    console.log("Que pasa mi jarma. estamos en listar tipos mascotas");
    let body = {
      accion: "ListarPettypes"//Este es el atributo que tenemos en servicio (acordarse de poner el mismo npobre del atributo al objeto que pasas)
    };
    return this.httpClient.post<Pet[]>(this.url, body);

  }

  ListarSpecialties() {

    console.log("Estoy listando especialidades");
    let body = {
      accion: "ListarSpecialties"//Este es el atributo que tenemos en servicio (acordarse de poner el mismo npobre del atributo al objeto que pasas)
    };
    return this.httpClient.post<any[]>(this.url, body);

  }

  AnadePet(idOwner: number, pet: Pet) {
    console.log("esto es pet en anadePet", pet);
    let obj = {
      name: pet.name,
      birthDate: pet.birthDate,
      type: { id: pet.id },
      owner: { id: idOwner }
    };
    let objPet = {
      accion: "AnadePet",
      pet: obj
    }

    console.log("esto es lo que le mando al servicio", objPet);
    return this.httpClient.post(this.url, objPet);
  }

  AnadePettype(PetType: Pettype) {

    console.log("Esto meto en anade petType", PetType);

    let objOwner = {
      accion: "AnadePettype",
      pettype: PetType
    }
    return this.httpClient.post<Pettype>(this.url, objOwner);//Así hemos tipado lo que nos devuleve. En este caso un array de Personas


  }

  AnadeSpecialty(Spe: any) {
    console.log("Esto meto AnadeSpecialty ", Spe);

    let objOwner = {
      accion: "AnadeSpecialty",
      specialty: Spe
    }
    return this.httpClient.post<any>(this.url, objOwner);//Así hemos tipado lo que nos devuleve. En este caso un array de Personas



  }

  AnadeVet(Vet: Vet) {
    console.log("Esto le mando a añadir vet", Vet)
    let objOwner = {
      accion: "AnadeVet",
      vet: Vet
      /*Vet={
        firstName:"",
        lastName:"",
        specialities:[
            {id: ""},
            {id: ""}
        ]
       }*/

    }
    return this.httpClient.post<any>(this.url, objOwner);

  }


  ModVeterinario(vet: Vet) {
    console.log("Esto le mando a Modificar vet", vet)
    let objOwner = {
      accion: "ModificaVet",
      vet: vet
    }
    return this.httpClient.post<any>(this.url, objOwner);
  }
  ObtenerOwnerId_Pets(id: number) {
    console.log("Estamos listado pets de owner");
    console.log("Pa", id);

    let objOwner = {
      accion: "ObtenerOwnerId_Pets",
      id: id
    }
    return this.httpClient.post<Owner>(this.url, JSON.stringify(objOwner));

  }

  ListarVisitasPet(id: number) {
    let objOwner = {
      accion: "ListarVisitasPet",
      id: id
    }
    return this.httpClient.post<Visit[]>(this.url, JSON.stringify(objOwner));

  }

  AnadeVisit(visit: Visit) {
    console.log("esto es pet en anadePet", visit);
    let obj = {
      petId: visit.pet,
      visitDate: visit.visitDate,
      description: visit.description
    };
    let objVisit = {
      accion: "AnadeVisit",
      visit: obj
    }

    console.log("esto es lo que le mando al servicio", objVisit);
    return this.httpClient.post(this.url, objVisit);
  }

  ModificaPet(idOwner: number, pet: Pet, idPet: number) {
    console.log("esto es pet en anadePet", pet);
    let obj = {
      name: pet.name,
      birthDate: pet.birthDate,
      type: { id: pet.id },
      owner: { id: idOwner },
      id: idPet
    };
    let objPet = {
      accion: "ModificaPet",
      pet: obj
    }

    console.log("esto es lo que le mando al servicio", objPet);
    return this.httpClient.post(this.url, objPet);
  }

  ObtenerPetId(idPet: number) {
    let objOwner = {
      accion: "ObtenerPetId",
      id: idPet
    }
    return this.httpClient.post<Pet>(this.url, JSON.stringify(objOwner));
  }

  ListarPettypes() {
    console.log("Que pasa mi jarma. esramos en getOwners");
    let body = {
      accion: "ListarPettypes"//Este es el atributo que tenemos en servicio (acordarse de poner el mismo npobre del atributo al objeto que pasas)
    };
    return this.httpClient.post<Pettype[]>(this.url, body);


  }
    EliminarVet(idVet: number) {
    console.log("Estamos borrando a un veterinario con id", idVet);
    let body={
      accion:"BorraVet",
      id:idVet
    }
    return this.httpClient.post<any>(this.url,body);
    }
}
