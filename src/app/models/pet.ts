import { Owner } from "./owner";

export interface Pet {
    id:number,
    name:string,
    birthDate: Date,
    type:any,
    typeName?:string,
    owner: Owner,
    ownerId:number,
    visits:any[]

}
