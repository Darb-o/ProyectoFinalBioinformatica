import { Component, } from '@angular/core';
import { ProSeqViewer } from 'proseqviewer/dist';
import { Organismo } from '../../interfaces/organismo.interface';
import { ListadoService } from '../../services/listado.service';

export interface cmb {
  secuencia: string;
  texto: string;
  checado: boolean;
  organismo: string;
}

interface sequenceInterface {
  sequence: string;
  id: number;
  label: string;
}

@Component({
  selector: 'app-alineamiento',
  templateUrl: './alineamiento.component.html',
  styles: [
  ]
})
export class AlineamientoComponent {

  //controla el radiobutton
  tipoAlineamiento: string = "";
  selectedOrganismo!: Organismo;
  organismos: Organismo[] = [];
  bandera: boolean = true;
  
  ngOnInit(): void {
    this.listadoService.getOrganismos()
      .subscribe( resp => {
        this.organismos = resp.organismos;
        console.log(this.organismos);
      })
  } 

  secuencia1: cmb  = {
    secuencia: "",
    texto: "Cambiar a archivo",
    checado: false,
    organismo: "",
  }

  validerCampo( $event: boolean){
    this.bandera = !$event;
  }

  boton1(evento:boolean){
    this.secuencia1.checado = evento;
    this.secuencia1.texto = (this.secuencia1.checado)? "Cambiar a caja de texto" : "Cambiar a archivo";
  }

  archivosec1( evento:any ){
    const file = evento.target.files[0]
    if(file){
      const reader: FileReader = new FileReader();
      reader.onload = ( e:any ) => {
        const resultado = e.target.result;
        this.convertir(resultado as string);
      }
      reader.readAsText(file);
    }
  }

  convertir( resultado : string){
    const ah = resultado.split(/\r\n|\r|\n/, -1);
    let cadena = "";
    for( let i = 1; i < ah.length; i++ ){
      cadena+= ah[i]; 
    }
    let nombre = ah[0].split(" ");
    let organismo = ""
    for( let i = 1; i < 3; i++){
      organismo+=nombre[i]+" "
    }
    this.secuencia1.secuencia = cadena;
    this.secuencia1.organismo = organismo;
  
  }
  
  constructor(private listadoService: ListadoService){}

}















  

