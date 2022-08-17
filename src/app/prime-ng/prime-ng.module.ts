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
import {InputNumberModule} from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import {FileUploadModule} from 'primeng/fileupload';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {KeyFilterModule} from 'primeng/keyfilter';
import {InputTextModule} from 'primeng/inputtext';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';;

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
    RippleModule,
    InputNumberModule,
    CheckboxModule,
    CardModule,
    ToolbarModule,
    SplitButtonModule,
    FileUploadModule,
    CascadeSelectModule,
    ToggleButtonModule,
    KeyFilterModule,
    InputTextModule,
    SliderModule,
    DialogModule
  ],
  imports: [
    CommonModule
  ]
})

export class PrimeNgModule { }
