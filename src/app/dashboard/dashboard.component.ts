import { Component, inject, OnInit } from '@angular/core';
import { Task } from '../Model/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
http:HttpClient=inject(HttpClient);

showCreateTaskForm: boolean = false;

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
    const headers=new HttpHeaders({'my-headers':'hello-world'})
    this.http.post('https://http-request-9281e-default-rtdb.firebaseio.com/tasks.json',data,{headers:headers}).subscribe((res)=>{
      console.log(res);
    });
  }

/*
{
  key:{},
  key:{}
}
*/
  private fetchAllTasks(){
    this.http.
    get<{[key:string]:Task}>('https://http-request-9281e-default-rtdb.firebaseio.com/tasks.json')
    .pipe(map((response)=>{
      let task=[];

      for(let key in response){
        if(response.hasOwnProperty(key)){

          task.push({...response[key],id:key})
        }
      }
      return task;
    }))
    .subscribe((task)=>{
      console.log(task)
    })
  }
}
