import { Component, OnInit } from '@angular/core';
import { Organismo, OrganismoRespuesta } from '../../interfaces/organismo.interface';
import { ListadoService } from '../../services/listado.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styles: [
  ]
})
export class ConsultaComponent implements OnInit {

  termino!: Organismo;
  mostrar: string = "nombre"
  filteredOrganismos: Organismo[] = [];
  organismos: Organismo[] = [];

  constructor( private listadoService: ListadoService ) { }

  ngOnInit(): void {
    this.listadoService.getOrganismos()
      .subscribe( resp => {
        this.organismos = resp.organismos;
        console.log(this.organismos);
      })
  } 

  filterOrg( event:any ) {
    let filtered : Organismo[] = [];
    let query = event.query;
    const regex = /^[0-9]*$/;
    (regex.test(query))?this.mostrar = "identificador":this.mostrar = "nombre";
    for(let i = 0; i < this.organismos.length; i++) {
        let organismo = this.organismos[i];
        if (organismo.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(organismo);
        }else if (organismo.identificador.indexOf(query) == 0) {
          filtered.push(organismo);
        }
    }
    this.filteredOrganismos = filtered;
  }

}
