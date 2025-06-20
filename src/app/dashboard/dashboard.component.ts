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

ngOnInit(): void {
  this.fetchAllTasks();
}

  OpenCreateTaskForm(){
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }
 
  CreateTask(data:Task){
    this.taskservice.CreateTask(data)
    this.EditMode=false;
    this.selectedTask={title:'',desc:'',assignedTo:'',createdAt:'',priority:'',status:''};
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
    this.showCreateTaskForm=true;
    this.EditMode=true;
    this.selectedTask=this.allTask.find((task)=>task.id===id);
  }
}
