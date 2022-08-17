import { Component, OnInit } from '@angular/core';
import { Organismo, OrganismoRespuesta } from '../../interfaces/organismo.interface';
import { ListadoService } from '../../services/listado.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styles: [
    `
    #div-c{
      background-color: var(--primary-color)
    }
    `
  ]
})
export class ConsultaComponent implements OnInit {

  termino: Organismo = {_id:"",identificador:"",encabezado:"",nombre:"",nombrec:"",descripcion:"",secuencia:"",imagen:"", __v:0,};
  mostrar: string = "nombrec";
  filteredOrganismos: Organismo[] = [];
  organismos: Organismo[] = [];
  displayModal: boolean = false;

  constructor( private listadoService: ListadoService ) { }

  ngOnInit(): void {
    this.listadoService.getOrganismos()
      .subscribe( resp => {
        this.organismos = resp.organismos;
      })
  } 

  filterOrg( event:any ) {
    let filtered : Organismo[] = [];
    let query = event.query;
    const regex = /^[0-9]*$/;
    (regex.test(query))?this.mostrar = "identificador":this.mostrar = "nombrec";
    for(let i = 0; i < this.organismos.length; i++) {
        let organismo = this.organismos[i];
        if (organismo.nombrec.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(organismo);
        }else if (organismo.identificador.indexOf(query) == 0) {
          filtered.push(organismo);
        }
    }
    this.filteredOrganismos = filtered;
  }

  selectConsulta(){
    this.displayModal = true;
  }

}
