import {LocalStorageService} from 'angular-2-local-storage';
import {Router} from '@angular/router';

export class BaseComponent {
  successMessage = '';
  errorMessage = '';
  connectionError = 'Error de conexión';

  constructor(localStorageService: LocalStorageService, router: Router) {
    if (!localStorageService.get('user')) {
      router.navigate(['login']);
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
}
