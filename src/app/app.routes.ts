import { Routes } from '@angular/router';
import { FormOwnerComponent } from './components/form-owner/form-owner.component';
import { OwnersComponent } from './components/owners/owners.component';
import { PetAddComponent } from './components/pet-add/pet-add.component';
import { DetailOwnerComponent } from './components/detail-owner/detail-owner.component';
import { VisitAddComponent } from './components/visit-add/visit-add.component';
import { VetsComponent } from './components/vets/vets.component';
import { PettypeListComponent } from './components/pettype-list/pettype-list.component';
import { SpecialtyListComponent } from './components/specialty-list/specialty-list.component';
import { VetAddComponent } from './components/vet-add/vet-add.component';

export const routes: Routes = [
    {path: "", component: OwnersComponent},

    {path:"formulario", component: FormOwnerComponent},//:id es para recoger un parámetro (elid en este caso)
    {path:"formulario/:id", component: FormOwnerComponent},
    {path:"detalles/:id", component: DetailOwnerComponent},
    {path:"pet-add/:nombre/:apellidos/:idOwner/:idPet", component: PetAddComponent},
    {path:"pet-add/:owner/:idPet/:idOwner", component: PetAddComponent},
    {path:"visit-add/:petId/:owner/:tipo/:nacimiento/:nombre/:ownerId", component: VisitAddComponent},
    {path:"vets", component: VetsComponent},
    {path:"pettype", component: PettypeListComponent},
    {path:"visit-add/:id/:petId/:Date/:description/:owner", component: VisitAddComponent},
    {path:"speciality-list", component: SpecialtyListComponent},
    {path: "vet-add/:id", component: VetAddComponent},
      
];
