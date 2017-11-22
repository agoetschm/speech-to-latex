import { Component } from '@angular/core';
import { SpeechToTextService } from "./speech-to-text.service";
import { SocketService } from "./socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rawText: string;

  constructor(private speechToTextService: SpeechToTextService,
            private socketService: SocketService) { }

  public record() {
    console.log("begin recording...")

    this.socketService.sendMessage("hi there")

    // navigator.mediaDevices.getUserMedia({ audio: true })
    // .then(function(stream) {
    //   console.log("on stream")
    //
    // })
    // .catch(function(err) {
    //   console.log("getUserMedia failed")
    // })

    // this.speechToTextService.convertSpeechToText()
    //   .subscribe(result => this.rawText = result.text())


  }
}
