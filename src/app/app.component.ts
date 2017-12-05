import { Component, Inject } from '@angular/core';
import { SpeechToTextService } from "./speech-to-text.service";
import { SocketService } from "./socket.service";

import { KatexOptions } from 'ng-katex';

import { DOCUMENT } from '@angular/common';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';

import * as Recorder from 'opus-recorder';

declare const MediaRecorder: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  actualYear = (new Date()).getFullYear()
  rawText: string
  recording: boolean
  convertingToText: boolean
  mediaRecorder: any
  chunks: any = []
  latexText: string = "\\sum_{i=1}^nx_i";

  stopRecFunc: () => void

  katexOptions: KatexOptions = {
    displayMode: true,
  }

  constructor(private speechToTextService: SpeechToTextService,
    private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) { }

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
        this.gotToLatex()
        this.convertToLatex()
      })
      // audio.src = window.URL.createObjectURL(blob);
      // audio.load();
      // audio.play();
    })

    rec.addEventListener("streamReady", (e) => {
      rec.start()
      console.log("started recording")
      this.recording = true
      this.stopRecFunc = () => {
        this.recording = false
        rec.stop()
        console.log("stopped recording")
        //rec.clearStream()
      }
      setTimeout(this.stopRecording, 25000);
    })

    rec.initStream()
      .catch((err) => {
        console.log("error trying to record: " + err.message)
      })



    // this.speechToTextService.convertSpeechToText()
    //   .subscribe(result => this.rawText = result.text())


  }

  stopRecording() {
    if (this.stopRecFunc) {
      this.stopRecFunc()
      this.stopRecFunc = undefined
    }
  }

  gotToLatex() {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#convert-to-latex');
    this.pageScrollService.start(pageScrollInstance);
  }

  convertToLatex() {
    console.log("convert to latex")
    const dict = {
      "zero": "0",
      "one": "1",
      "two": "2",
      "three": "3",
      "four": "4",
      "five": "5",
      "six": "6",
      "seven": "7",
      "eight": "8",
      "nine": "9",
      "equals": "=",
      "fraction": "\\frac{",
      "over": "}{",
      "/": "}{",
      "and": "end", // maybe I just can't pronounce it...
      "end": "}",
      "power": "^",
      "sum": "\\sum",
      "from": "_{",
      "to": "}^{",
      "of": "}{",
      "sum }": "sum", // dirty
      "squared": "^2"
    }
    var text = this.rawText.toLowerCase()

    for (var key in dict) {
      text = text.replace(new RegExp(key, "g"), dict[key])
    }

    this.latexText = text
  }
}
