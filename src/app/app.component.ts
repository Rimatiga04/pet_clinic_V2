import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OwnersComponent } from './components/owners/owners.component';
import { FormOwnerComponent } from './components/form-owner/form-owner.component';
import { PrimeNG } from 'primeng/config';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OwnersComponent, FormOwnerComponent, MenubarModule,AvatarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { 
  public items: any[];
  constructor(private primeng: PrimeNG,private ruta:Router) {
    this.items = [
      { label: 'Owners', icon: 'pi pi-home',items: [
        { label: 'Get owners', icon: 'pi pi-pencil',command: () => this.ruta.navigate(['/']) },
        { label: 'New owner', icon: 'pi pi-code',command: () => this.ruta.navigate(['formulario/-1']) }
      ]/*Muy atento a esto*/  },
      { label: 'Veterinarios', icon: 'pi pi-info',command: () => this.ruta.navigate(['/vets']) },
      { label: 'Pet types', icon: 'pi pi-cogs', command: () => this.ruta.navigate(['/pettype'])},
      { label: 'Especialidades', icon: 'pi pi-envelope',  command: () => this.ruta.navigate(['/speciality-list']) },
      { label: 'log out', icon: 'pi pi-envelope' }
    ];
  }
//command: () => this.ruta.navigate(['/']
  ngOnInit() {
      this.primeng.ripple.set(true);
  }
}
