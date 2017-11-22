import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { MaterializeModule } from 'angular2-materialize';

import {Ng2PageScrollModule} from 'ng2-page-scroll';

import { AppComponent } from './app.component';
import { LatexComponent } from "./latex.component";
import { SpeechToTextService } from './speech-to-text.service';
import { SocketService } from './socket.service';



@NgModule({
  declarations: [
    AppComponent,
    LatexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    Ng2PageScrollModule
  ],
  providers: [
    SpeechToTextService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
