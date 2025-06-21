import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class LoggingInterceptor implements HttpInterceptor{
 
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Logging Interceptor called!')
        console.log("The Url is :" + req.url);
       return next.handle(req);
    }

}