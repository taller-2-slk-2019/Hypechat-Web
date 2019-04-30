export class BaseComponent {
  successMessage = '';
  errorMessage = '';
  connectionError = 'Error de conexión';

  constructor() { }

  setError(message: string) {
    this.errorMessage = message;
    this.successMessage = '';
  }

  setSuccess(message: string) {
    this.successMessage = message;
    this.errorMessage = '';
  }
}
