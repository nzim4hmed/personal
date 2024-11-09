import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ADminService } from 'src/app/common/services/superAdminService/admin.service';
import { Subject, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/common/services/common-service/alert.service';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {
  unsubscribe: Subject<any> = new Subject();
  constructor(
    private _adminService: ADminService,
    private _alertService: AlertService,
     @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data);

  }

  updateStatus() {

    let formData = {
      sponsor_id: this.data.sponsor_id,
      status: this.data.status === 'Active' ? 'Inactive' : 'Active'
    }
 
    this._adminService.updateUserStatus(formData).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        console.log(res);
        this._alertService.swalPopSuccess('Status Updated Successfully')


      }, error: (err: any) => { console.log('error', err) }
    })

  }

}
