import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { MomentModule } from 'angular2-moment';
import { HttpClientModule } from '@angular/common/http';
//import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { InputTextModule, ProgressBarModule, GrowlModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { ValueService, AuthProvider } from './auth';
import { SimpleTimer } from 'ng2-simple-timer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MdButtonModule, MdIconModule, MdInputModule, MdSelectModule, MdSlideToggleModule, MdTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdKeyboardModule } from '@ngx-material-keyboard/core';


type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    HttpClientModule,
    NgbModule.forRoot(),
    InputTextModule,
    ProgressBarModule,
    GrowlModule,

    // Material modules
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdSelectModule,
    MdSlideToggleModule,
    MdKeyboardModule,
    MdTabsModule
  ],
  providers: [SimpleTimer, AuthProvider, ValueService, AppState],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
}
