import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SpeechToTextService {

  constructor(private http: Http) { }

  convertSpeechToText(){
    return this.http.get('/api/speech-to-text')
  }

}
