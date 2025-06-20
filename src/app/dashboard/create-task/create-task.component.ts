import { Component ,EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/Model/task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
@Input() isEditMode:boolean=false;

@Input() selectedTask:Task;

 @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmitTaskData:EventEmitter<Task>=new EventEmitter<Task>();

  @ViewChild('taskForm')taskform:NgForm;
  ngAfterViewInit(){
    setTimeout(()=>{
      this.taskform.form.patchValue(this.selectedTask)

    },0)
  }

  OnCloseForm(){
    this.CloseForm.emit(false);
  }

  onFormSubmitted(form:NgForm){
    this.EmitTaskData.emit(form.value);
        this.CloseForm.emit(false);

  }
}
