import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})
export class LogginService{

http:HttpClient=inject(HttpClient);

logError(data:{statusCode:number,errorMessage:string,dateTime:Date}){
    this.http.post('https://http-request-9281e-default-rtdb.firebaseio.com/logs.json',data).subscribe();
}

fetchError(){
    this.http.get('https://http-request-9281e-default-rtdb.firebaseio.com/logs.json').subscribe({next:(data)=>{
        console.log(data);
    }});
}

}