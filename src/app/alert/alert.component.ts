import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  private successMessage = '';
  private errorMessage = '';

  constructor() { }

  ngOnInit() {
  }

  changeSuccessMessage(message: string) {
    this.successMessage = message;
  }

  changeErrorMessage(message: string) {
    this.errorMessage = message;
  }
}
