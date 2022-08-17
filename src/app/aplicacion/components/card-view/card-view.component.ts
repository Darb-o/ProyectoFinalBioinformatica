import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Organismo } from '../../interfaces/organismo.interface';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styles: [
    `
      :host ::ng-deep .p-button {
          margin: 0 .5rem 0 0;
          min-width: 10rem;
      }

      p {
          margin: 0;
      }

      .confirmation-content {
          display: flex;
          align-items: center;
          justify-content: center;
      }

      :host ::ng-deep .p-dialog .p-button {
          min-width: 6rem;
      }
  `
  ]
})
export class CardViewComponent implements OnInit, OnChanges {

  @Input() organismos!: Organismo[];
  organismoSeleccionado!: Organismo;
  displayModal: boolean = false;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  mostrarOrganismo( variable:number ){
    this.organismoSeleccionado = this.organismos[variable];
    this.displayModal = true;
  }

}
