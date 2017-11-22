import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
    this.socket.on('message', (data) => {
      console.log("got from server: " + data)
    });
  }

  sendMessage(message) {
    this.socket.emit('join', message);
  }

  getMessages() {
    let observable = new Observable(observer => {

      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
