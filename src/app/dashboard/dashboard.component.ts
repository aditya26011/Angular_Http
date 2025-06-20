import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../Model/task';

import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
showCreateTaskForm: boolean = false;
taskservice:TaskService=inject(TaskService);
allTask:Task[]=[];
selectedTask!:Task;
EditMode:boolean=false;
currentSelectedTaskId:string|undefined;
ngOnInit(): void {
  this.fetchAllTasks();
}

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
      this.EditMode=false;
    this.selectedTask={title:'',desc:'',assignedTo:'',createdAt:'',priority:'',status:''};

  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }
 
  CreateOrUpdateTask(data:Task){
    if(!this.EditMode){

      this.taskservice.CreateTask(data)
    }
    else{
      //edit task
          this.taskservice.updateTask(this.currentSelectedTaskId,data);
    }
  }

/*
{
  key:{},
  key:{}
}
*/

FetchAllTasksClicked(){
  this.fetchAllTasks();
}


  private fetchAllTasks(){
    this.taskservice.GetAllTask().subscribe((task)=>{
      this.allTask=task;
    })
  }


  DeleteTask(id:string| undefined){
   this.taskservice.DeleteTask(id);
  }

  DeleteAll(){
   this.taskservice.DeleteAllTask();
  }

  OnEditClicked(id:string|undefined){
    //Open the form
   this.currentSelectedTaskId=id
    this.showCreateTaskForm=true;
    this.EditMode=true;
    this.selectedTask=this.allTask.find((task)=>task.id===id);
  }
}
