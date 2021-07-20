import { Injectable } from '@angular/core';
 import { Goals } from '../goalList'; //import Goals array

@Injectable({
  providedIn: 'root'// root means that service is injectable throught the application
})
export class GoalService {

  getGoals(){ // method that returns our Goals array
    return Goals
  }

  constructor() { }
}
