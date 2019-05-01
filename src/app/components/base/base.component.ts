import {Router} from '@angular/router';
import {MyLocalStorageService} from '../../services/my-local-storage.service';

export class BaseComponent {
  successMessage = '';
  errorMessage = '';
  connectionError = 'Error de conexión';

  constructor(localStorageService: MyLocalStorageService, router: Router) {
    if (!localStorageService.isLoggedIn()) {
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
