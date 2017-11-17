import { Component } from '@angular/core';
import { SpeechToTextService } from "./speech-to-text.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rawText: string;

  constructor(private speechToTextService: SpeechToTextService) { }

  public record() {
    console.log("begin recording...")

    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
      console.log("on stream")
      /* use the stream */
    })
    .catch(function(err) {
      console.log("getUserMedia failed")
    })
    // this.speechToTextService.convertSpeechToText()
    //   .subscribe(result => this.rawText = result.text())


  }
}
