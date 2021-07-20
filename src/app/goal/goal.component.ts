import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import { AlertService } from '../alert-service/alert.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
  providers: [GoalService]
})
export class GoalComponent implements OnInit { 
  goals:Goal[];
  alertService:AlertService
  addNewGoal (goal:any){
  let goalLength = this.goals.length;
  goal.id = goalLength+1;
  goal.completeDate = new Date(goal.completeDate)
  this.goals.push(goal)
  
}

  
  deleteGoal(isComplete:any, index:any){
    if (isComplete){
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)

      if (toDelete){
        this.goals.splice(index,1)
        this.alertService.alertMe("The goal has been deleted")//uses Alertme() method from the service to display the message inside after user confirms yo delete a goal
      }
    }
  }
  toggleDetails(index: any){
    this.goals[index].showDescription = !this.goals[index].showDescription
  }
 
  
  
  constructor(goalService:GoalService, alertService:AlertService) {
    this.goals = goalService.getGoals()
    this.alertService = alertService;
   }

  ngOnInit(): void {
  }

}
