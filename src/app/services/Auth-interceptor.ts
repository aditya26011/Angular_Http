import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, retry, tap } from "rxjs";

export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler) {
       const modified= req.clone({headers:req.headers.append('aut','axv')})
       return next.handle(modified).pipe(tap((event)=>{
        if(event.type===HttpEventType.Response){
            console.log('Response has Arrived.Response data:');
            console.log(event.body);
        }
       }))
    }


}