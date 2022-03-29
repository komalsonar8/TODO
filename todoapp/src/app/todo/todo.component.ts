import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder , Validators } from '@angular/forms';
import { ITask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm!:FormGroup;
  tasks : ITask []= [];
  inprogress : ITask [] =[];
  done : ITask [] = [];
  
  updateId!:any;
  isEditEnabled:boolean=false;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.todoForm=this.fb.group({
      item:['', Validators.required]
    })

  }

  addTask(){
    this.tasks.push({
      descrption:this.todoForm.value.item,
      done:false
    })
  }

  onEdit(item:ITask, i:number){
    this.todoForm.controls['item'].setValue(item.descrption);
    this.updateId=i;
    this.isEditEnabled=true;

  }

  deleteTask(i:number)
  {
    this.tasks.splice(i,1)
  }
  deleteinprogressTask(i:number)
  {
    this.inprogress.splice(i,1)
  }

  deletedoneTask(i:number)
  {
    this.inprogress.splice(i,1)
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}

