import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-alert-success',
  templateUrl: './alert-success.component.html',
  styleUrls: ['./alert-success.component.css']
})
export class AlertSuccessComponent implements OnInit {

  @Input() successMessage = '';
  @Output() close = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  reset(){
    this.close.emit('');
  }
}
