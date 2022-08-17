import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType} from 'chart.js';
import { Organismo } from '../../interfaces/organismo.interface';

interface dotplot {
  x: number;
  y: number;
}

@Component({
  selector: 'app-dotplot',
  templateUrl: './dotplot.component.html',
  styles: [
  ]
})
export class DotplotComponent implements OnInit, OnChanges {

  @Input() secuenciaI!: Organismo;
  @Input() secuenciaB!: Organismo;
  secuenciaIng : string = "";
  secuenciaBas : string = "";
  puntos: dotplot[] = [];

  scatterChartOptions: ChartConfiguration['options'];
  scatterChartType: ChartType = 'scatter';
  scatterChartData!: ChartData<'scatter'>;
  
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Cambie dotplot");
    this.inicializarScatter();
  }

  ngOnInit(): void { 
  }

  inicializarScatter(){
    if(!this.secuenciaI||!this.secuenciaB){
      return;
    }
    if(this.secuenciaB.secuencia.length<1||this.secuenciaI.secuencia.length<1){
      return;
    }
    this.secuenciaIng = this.secuenciaI.secuencia;
    this.secuenciaBas = this.secuenciaB.secuencia;
    if(this.secuenciaB.secuencia.length>20){
      this.secuenciaBas = this.secuenciaB.secuencia.slice(0,20);
    }
    if(this.secuenciaI.secuencia.length>20){
      this.secuenciaIng = this.secuenciaI.secuencia.slice(0,20);
    }
    console.log(this.secuenciaBas);
    console.log(this.secuenciaIng);
    this.secuenciaBas = " "+this.secuenciaBas;
    this.secuenciaIng = " "+this.secuenciaIng;
    console.log(this.secuenciaBas);
    console.log(this.secuenciaIng);
    this.scatterChartOptions = { 
      responsive: true,
      scales: {
        yAxes: {
          beginAtZero: true,
          ticks: { stepSize:1 , callback: (value,index) => this.secuenciaBas[index]}
        },
        xAxes: {
          beginAtZero: true,
          ticks: { stepSize:1 , callback: (value,index) => this.secuenciaIng[index]}
        }
      }
    };
    this.puntos = [];
    const longSecuenciaI: number = this.secuenciaIng.length;
    const longSecuenciaB: number = this.secuenciaBas.length;
    let obj : dotplot;
    for( let i = 1; i < longSecuenciaI; i++){
      for( let j = 1; j < longSecuenciaB; j++ ){
        if( this.secuenciaIng[i] === this.secuenciaBas[j]){
          obj = {
            x: i, y: j
          }
          this.puntos.push( obj );
        }
      }
    }
    this.scatterChartData = {
      datasets: [
        {
          data: this.puntos,
          label: 'Dotplot secuencias',
          pointRadius: 6,
        },
      ]
    };
  }
  
  // events
  chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  
  // pluginLine:any = {
  //   id: 'pluginLine',
  //   beforeDraw: (chart:any, args:any, options:any) => {
  //     const {ctx, scales:{x,y}} = chart;
  //     ctx.save();
  //     ctx.beginPath();
  //     ctx.strokeStyle = 'rgba(255,26,104,1)';
  //     ctx.lineWidth = 3;
  //     ctx.moveTo(x.getPixelForValue(0), y.getPixelForValue(0));
  //     ctx.lineTo(x.getPixelForValue(4), y.getPixelForValue(4));
  //     ctx.stroke();
  //   }
  // }


}
