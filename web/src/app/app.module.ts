import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { NumberPickerComponent } from 'angular2-number-picker/components';
import { MomentModule } from 'angular2-moment';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MomentModule,
    FormsModule,
    NguiDatetimePickerModule
    //NumberPickerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
