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
  mediaRecorder: any
  chunks: any = []

  constructor(private speechToTextService: SpeechToTextService,
    private socketService: SocketService) { }

  public record() {
    const rec = new Recorder({originalSampleRateOverride: 16000})
    if (!Recorder.isRecordingSupported()) {
      console.log("recording not supported")
      // TODO toast
    }

    rec.addEventListener("dataAvailable", (e) => {
      console.log("data available")
      // const audio = new Audio();
      var blob = new Blob( [e.detail], { type: 'audio/ogg; codecs=opus' } )
      this.socketService.sendAudio(blob, (text) => {
        this.rawText = text
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



    // this.socketService.sendMessage("hi there")



    // navigator.mediaDevices.getUserMedia({ audio: true })
    //   .then((stream) => {
    //     console.log("on stream")
    //     this.mediaRecorder = new MediaRecorder(stream);
    //     this.mediaRecorder.onstart = (e) => {
    //       console.log("begin recording...")
    //       this.chunks = []
    //     };
    //     this.mediaRecorder.ondataavailable = (e) => {
    //       this.chunks.push(e.data);
    //       console.log("recording...")
    //     };
    //     this.mediaRecorder.onstop = (e) => {
    //       console.log("end of recording")
    //       const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
    //       this.socketService.sendAudio(blob);
    //       // const audio = new Audio();
    //       // const blob = new Blob(this.chunks, { 'type': 'audio/ogg; codecs=opus' });
    //       // this.chunks.length = 0;
    //       // audio.src = window.URL.createObjectURL(blob);
    //       // audio.load();
    //       // audio.play();
    //     };
    //
    //
    //     // Start recording
    //     this.mediaRecorder.start()
    //     this.recording = true
    //
    //     // Stop recording after 5 seconds and broadcast it to server
    //     setTimeout(() => {
    //       this.recording = false
    //       this.mediaRecorder.stop()
    //       stream.getTracks()[0].stop()
    //     }, 5000);
    //   })
    //   .catch((err) => {
    //     // TODO toast
    //     console.log("getUserMedia failed : " + err)
    //   })

    // this.speechToTextService.convertSpeechToText()
    //   .subscribe(result => this.rawText = result.text())


  }
}
