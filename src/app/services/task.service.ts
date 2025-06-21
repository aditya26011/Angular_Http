import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Task } from "../Model/task";
import { map, Subject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class TaskService{

http:HttpClient=inject(HttpClient);
errorSubject=new Subject<HttpErrorResponse>();


 CreateTask(data:Task){
    const headers=new HttpHeaders({'my-headers':'hello-world'})
    this.http.post('https://http-request-9281e-default-rtdb.firebaseio.com/tasks.json',data,{headers:headers})
    .subscribe({error:(err)=>{
      this.errorSubject.next(err);
    }});
  }
  DeleteTask(id:string | undefined){
    this.http.delete('https://http-request-9281e-default-rtdb.firebaseio.com/tasks/'+ id +'.json')
    .subscribe()
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
  updateTask(id:string|undefined,data:Task){
    this.http.put('https://http-request-9281e-default-rtdb.firebaseio.com/tasks/'+id+'.json',data).subscribe()
  }
  }

