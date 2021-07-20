import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertMe(message: string){ //alertme method accepts a message of string type
    alert(message)
  }

  constructor() { }
}
