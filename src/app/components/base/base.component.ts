import {Router} from '@angular/router';
import {MyLocalStorageService} from '../../services/my-local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  successMessage = '';
  errorMessage = '';
  loading = false;
  connectionError = 'Error de conexión';
  private spinner: NgxSpinnerService;

  constructor(localStorageService: MyLocalStorageService, router: Router, spinner: NgxSpinnerService) {
    this.spinner = spinner;
    if (!localStorageService.isLoggedIn()) {
      router.navigate(['']);
    }
  }

  setError(message: string) {
    this.errorMessage = message;
    this.successMessage = '';
  }

  setSuccess(message: string) {
    this.successMessage = message;
    this.errorMessage = '';
  }

  showLoading() {
    this.successMessage = '';
    this.errorMessage = '';
    this.loading = true;
    this.spinner.show();
  }

  hideLoading() {
    this.loading = false;
    this.spinner.hide();
  }
}
