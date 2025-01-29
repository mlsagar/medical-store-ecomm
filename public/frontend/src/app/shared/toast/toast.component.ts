import { Component, OnInit } from '@angular/core';
import { MESSAGE_TYPE, ToastService } from './toast.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './toast.component.html'
})
export class ToastComponent implements OnInit{
  messageType = MESSAGE_TYPE;
  constructor(
    public toast: ToastService
  ) {}
  ngOnInit(): void {
    // this._toastService.toastMessage$.subscribe(console.log)    
  }

  dismiss() {
    this.toast.close();
  }
  
}
