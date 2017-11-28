import { Injectable } from '@angular/core';
import { SocketService } from "./socket.service";

@Injectable()
export class SpeechToTextService {

  constructor(private socketService: SocketService) { }

  convertSpeechToText(blob: Blob, callback){
    this.socketService.sendAudio(blob, callback)
  }

}
