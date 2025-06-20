import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Task } from "../Model/task";
import { map } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class TaskService{

http:HttpClient=inject(HttpClient);


 CreateTask(data:Task){
    const headers=new HttpHeaders({'my-headers':'hello-world'})
    this.http.post('https://http-request-9281e-default-rtdb.firebaseio.com/tasks.json',data,{headers:headers}).subscribe((res)=>{
      console.log(res);
    });
  }
  DeleteTask(id:string | undefined){
    this.http.delete('https://http-request-9281e-default-rtdb.firebaseio.com/tasks/'+ id +'.json')
    .subscribe((res)=>{
    })
  }

  DeleteAllTask(){
     this.http.delete('https://http-request-9281e-default-rtdb.firebaseio.com/tasks.json').subscribe((res)=>{
    })
  }

  GetAllTask(){
   return this.http.
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
  }
  }

