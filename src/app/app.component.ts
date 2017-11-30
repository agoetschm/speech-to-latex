import { Component } from '@angular/core';
import { SpeechToTextService } from "./speech-to-text.service";
import { SocketService } from "./socket.service";

import * as Recorder from 'opus-recorder';

declare const MediaRecorder: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rawText: string
  recording: boolean
  convertingToText: boolean
  mediaRecorder: any
  chunks: any = []
  latexText: string = "\sum_{i=1}^nx_i";

  constructor(private speechToTextService: SpeechToTextService) { }

  public isTextEmpty(): boolean {
    return this.rawText.length == 0
  }

  public record() {
    const rec = new Recorder({ originalSampleRateOverride: 16000 })
    if (!Recorder.isRecordingSupported()) {
      console.log("recording not supported")
      // TODO toast
    }

    rec.addEventListener("dataAvailable", (e) => {
      console.log("data available")
      // const audio = new Audio();
      var blob = new Blob([e.detail], { type: 'audio/ogg; codecs=opus' })
      this.convertingToText = true
      this.speechToTextService.convertSpeechToText(blob, (text) => {
        this.rawText = text
        this.convertingToText = false
      })
      // audio.src = window.URL.createObjectURL(blob);
      // audio.load();
      // audio.play();
    })

    rec.addEventListener("streamReady", (e) => {
      rec.start()
      console.log("started recording")
      this.recording = true
      setTimeout(() => {
        this.recording = false
        rec.stop()
        console.log("stopped recording")
        //rec.clearStream()
      }, 5000);
    })

    rec.initStream()
      .catch((err) => {
        console.log("error trying to record: " + err.message)
      })



    // this.speechToTextService.convertSpeechToText()
    //   .subscribe(result => this.rawText = result.text())


  }

  convertToLatex() {
    console.log("convert to latex")
  }
}
