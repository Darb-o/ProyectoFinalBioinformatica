import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Organismo } from '../../interfaces/organismo.interface';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styles: [
  ]
})
export class CardViewComponent implements OnInit, OnChanges {

  @Input() organismos!: Organismo[];

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
  }

}
