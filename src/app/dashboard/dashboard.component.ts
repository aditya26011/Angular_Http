import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../Model/task';

import { TaskService } from '../services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
showCreateTaskForm: boolean = false;
showTaskDetail:boolean=false
taskservice:TaskService=inject(TaskService);
allTask:Task[]=[];
selectedTask!:Task;
EditMode:boolean=false;
currentSelectedTaskId:string|undefined;

errorMessage:string|null=null;
errSub:Subscription;
currentTask:Task|null=null;

ngOnInit(): void {
  this.fetchAllTasks();
  this.errSub=this.taskservice.errorSubject.subscribe({next:(err)=>{
    this.setErrorMsg(err);
  }})
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
    this.taskservice.GetAllTask().subscribe({next:(task)=>{
      this.allTask=task;
    },error:(err)=>{
      this.setErrorMsg(err);
    //  this.errorMessage=err.message;
     setTimeout(()=>{
      this.errorMessage=null
    },3000)
    }})
  }

  private setErrorMsg(err:HttpErrorResponse){
    if(err.error.error==="Permission denied"){
      this.errorMessage='You do not have permession '
    }
    else{
      this.errorMessage=err.message;
    }
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

  showCurrentTaskDetail(id:string |undefined){
    this.showTaskDetail=true;
    this.taskservice.getTaskDetails(id).subscribe({next:(data:Task)=>{
      this.currentTask=data;
    }});
  }

  closeCurrentTaskDetail(){
    this.showTaskDetail=false;
  }

  ngOnDestroy(){
    this.errSub.unsubscribe();
  }
}
