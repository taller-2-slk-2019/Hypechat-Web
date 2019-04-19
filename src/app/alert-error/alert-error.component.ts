import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.css']
})
export class AlertErrorComponent implements OnInit {

  @Input() errorMessage = '';
  @Output() close = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  reset(){
    this.close.emit('');
  }

}
