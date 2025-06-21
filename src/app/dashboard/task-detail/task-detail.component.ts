import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/Model/task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent {
 @Input()
 currentTask:Task | null=null;

  @Output() 
  closeShowTaskDetail:EventEmitter<boolean>=new EventEmitter<boolean>();

  onCloseDetail(){
    this.closeShowTaskDetail.emit(false);
  }

}
