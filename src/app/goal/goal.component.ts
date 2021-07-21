import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import { AlertService } from '../alert-service/alert.service';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../quote-class/quote';
import { QuoteRequestService } from '../quote-http/quote-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
  //providers: [GoalService]
})
export class GoalComponent implements OnInit { 
  
  goToUrl(id:any){
    this.router.navigate(['/goals',id])
  }

  goals:Goal[];
  
  alertService!:AlertService
  quote!:Quote;

  addNewGoal (goal:any){
  let goalLength = this.goals.length;
  goal.id = goalLength+1;
  goal.completeDate = new Date(goal.completeDate)
  this.goals.push(goal)
  
}

  
  deleteGoal(index: any){
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)

      if (toDelete){
        this.goals.splice(index,1)
        this.alertService.alertMe("Goal has been deleted")//uses Alertme() method from the service to display the message inside after user confirms yo delete a goal
      }
    }
  
    toggleDetails(index: any) {
      this.goals[index].showDescription =!this.goals[index].showDescription;
    } completeGoal(isComplete: any, index: any){
      if(isComplete) {
        this.goals.splice(index,1)
      }
    }
 
  
  
  constructor(goalService:GoalService, alertService:AlertService, private http:HttpClient, private quoteService:QuoteRequestService, private router:Router){
    this.goals = goalService.getGoals()
    this.alertService = alertService;
   }

  ngOnInit():void{

    this.quoteService.quoteRequest()
    this.quote = this.quoteService.quote
    
    interface ApiResponse{
      author:string;
      quote:string;
    }
    this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data=>{
      // Succesful API request
      this.quote = new Quote(data.author, data.quote)
    },err=>{
      this.quote = new Quote ("Winston Churchill", " Never never give up!")
      console.log("An errror occured")
    })
  }
}
