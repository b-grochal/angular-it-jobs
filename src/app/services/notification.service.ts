import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showSuccessNotification(message: string, title: string) {
    this.toastr.success(message, title);
  }

  showErrorNotification(message: string, title: string) {
    this.toastr.error(message, title);
  }

  showWarningNotofication(message: string, title: string) {
    this.toastr.warning(message, title);
  }
}
