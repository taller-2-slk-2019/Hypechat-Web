import { Router } from '@angular/router';
import { MyLocalStorageService } from '../../services/my-local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

export class BaseComponent {
  loading = false;
  connectionError = 'Error de conexión';
  private spinner: NgxSpinnerService;
  private router: Router;
  private localStorageService: MyLocalStorageService;
  private toastService: ToastrService;

  constructor(localStorageService: MyLocalStorageService, router: Router, spinner: NgxSpinnerService,
              toastService: ToastrService) {
    this.spinner = spinner;
    this.router = router;
    this.localStorageService = localStorageService;
    this.toastService = toastService;
    if (!this.localStorageService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  setError(message: string) {
    this.toastService.error(message);
  }

  setSuccess(message: string) {
    this.toastService.success(message);
  }

  setWarning(message: string) {
    this.toastService.warning(message);
  }

  showLoading() {
    this.loading = true;
    this.spinner.show();
  }

  hideLoading() {
    this.loading = false;
    this.spinner.hide();
  }
}
