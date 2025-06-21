import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Task } from "../Model/task";
import { catchError, map, Subject, throwError, UnaryFunction } from "rxjs";
import { LogginService } from "./Loggins.service";

@Injectable({
    providedIn:'root'
})
export class TaskService{

http:HttpClient=inject(HttpClient);
errorSubject=new Subject<HttpErrorResponse>();
logginservice:LogginService=inject(LogginService);

 CreateTask(data:Task){
    const headers=new HttpHeaders({'my-headers':'hello-world'})
    this.http.post('https://http-request-9281e-default-rtdb.firebaseio.com/tasks.json',data,{headers:headers})
    .pipe(catchError((err)=>{
      //write logic to log errors
      const errorObj={statusCode:err.status,errorMessage:err.message,dateTime:new Date()};
      this.logginservice.logError(errorObj)

      return throwError(()=>err)
    }))
    .subscribe({error:(err)=>{
      this.errorSubject.next(err);
    }});
  }
  DeleteTask(id:string | undefined){
    this.http.delete('https://http-request-9281e-default-rtdb.firebaseio.com/tasks/'+ id +'.json')
    .pipe(catchError((err)=>{
      //write logic to log errors
      const errorObj={statusCode:err.status,errorMessage:err.message,dateTime:new Date()};
      this.logginservice.logError(errorObj)

      return throwError(()=>err)
    }))
    .subscribe()
  }

  DeleteAllTask(){
     this.http.delete('https://http-request-9281e-default-rtdb.firebaseio.com/tasks.json')
     .pipe(catchError((err)=>{
      //write logic to log errors
      const errorObj={statusCode:err.status,errorMessage:err.message,dateTime:new Date()};
      this.logginservice.logError(errorObj)

      return throwError(()=>err)
    }))
     .subscribe((res)=>{
    })
  }

  GetAllTask(){
    let headers=new HttpHeaders();// httpHeaders is an immutable type instance it will return a new instance
    headers=headers.set('content-type','application/json');
    headers=headers.set('Access-control-Allow-origin','*');

   return this.http.
    get<{[key:string]:Task}>('https://http-request-9281e-default-rtdb.firebaseio.com/tasks.json',{headers:headers})
    .pipe(map((response)=>{
      let task=[];

      for(let key in response){
        if(response.hasOwnProperty(key)){

          task.push({...response[key],id:key})
        }
      }
      return task;
    }),catchError((err)=>{
      //write logic to log errors
      const errorObj={statusCode:err.status,errorMessage:err.message,dateTime:new Date()};
      this.logginservice.logError(errorObj)

      return throwError(()=>err)
    }))
  }
  updateTask(id:string|undefined,data:Task){
    this.http.put('https://http-request-9281e-default-rtdb.firebaseio.com/tasks/'+id+'.json',data)
    .pipe(catchError((err)=>{
      //write logic to log errors
      const errorObj={statusCode:err.status,errorMessage:err.message,dateTime:new Date()};
      this.logginservice.logError(errorObj)

      return throwError(()=>err)
    }))
    .subscribe()
  }

  getTaskDetails(id:string|undefined){
   return this.http.get('https://http-request-9281e-default-rtdb.firebaseio.com/tasks/'+ id +'.json')
    .pipe(map((response)=>{
      let task={};
      task={...response,id:id}
      return task;
    }))
  }
  }

