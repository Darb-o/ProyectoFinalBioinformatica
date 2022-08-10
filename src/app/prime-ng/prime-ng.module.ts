import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ButtonModule} from 'primeng/button';
import {TabMenuModule} from 'primeng/tabmenu';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputSwitchModule} from 'primeng/inputswitch';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {RippleModule} from 'primeng/ripple';

@NgModule({
  exports: [
    ButtonModule,
    TabMenuModule,
    AutoCompleteModule,
    InputSwitchModule,
    RadioButtonModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    RippleModule
  ],
  imports: [
    CommonModule
  ]
})

export class PrimeNgModule { }
