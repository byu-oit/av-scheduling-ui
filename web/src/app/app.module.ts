import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SimpleTimer } from 'ng2-simple-timer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { HelpModal } from './helpModal';

//import { NgVirtualKeyboardModule } from '@protacon/ng-virtual-keyboard';

@NgModule({
  declarations: [
    AppComponent
    //HelpModal
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MomentModule,
    HttpClientModule,
    NgbModule.forRoot()
    //NgVirtualKeyboardModule
  ],
  providers: [SimpleTimer],
  bootstrap: [AppComponent]
})
export class AppModule { }
