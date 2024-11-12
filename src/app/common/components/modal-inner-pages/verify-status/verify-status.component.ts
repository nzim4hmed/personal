import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/app/material.module';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/common/services/common-service/alert.service';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';
import { UploadService } from 'src/app/common/services/common-service/upload.service';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';
import { ADminService } from 'src/app/common/services/superAdminService/admin.service';

@Component({
  selector: 'app-verify-status',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatInputModule, MatFormFieldModule, CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './verify-status.component.html',
  styleUrls: ['./verify-status.component.scss']
})
export class VerifyStatusComponent {
  unsubscribe: Subject<any> = new Subject();
  verifyStatusForm!: FormGroup;

  selectedFromDate: any;
  selectedToDate: any;
  name = 'Angular 6';
  minDate: Date = new Date();
  maxDate:any

  // upload
  brochureFileUploadRes: any
  prefixViewPath = environment.fileUrl
  prefixforpayment = environment.paymentfile
  paymentFileName: any

  categoryMaster: Array<any> = [];
  userDetails: any
  constructor(
    private _dialogRef: MatDialogRef<VerifyStatusComponent>,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _adminService: ADminService,
    private _uploadService: UploadService,
    private _authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public paymentDetails: any,
  ) { }

  ngOnInit() {
    console.log(this.minDate);
    
    console.log(this.paymentDetails);
    this.userDetails = this._authService.getLoginUserData();
    this.verifyStatusForm = this.addProductform(this.paymentDetails);

    const fullPath = this.paymentDetails.payment_ss_client;
    this.paymentFileName = fullPath.split('/').pop();

   

  }


  addProductform(data: any) {
    console.log(data);


    return this._fb.group({
    
      userId: [this.paymentDetails.user_id || '', Validators.required],
      orderId: [this.paymentDetails.id || '', Validators.required],
      orderStatus: ['Confirmed'],
      paymentStatus: ['Completed'],
      deliveryDate: [this.paymentDetails?.delivery_date || '', Validators.required],
  


    })
  }










  submitPayment() {

 

    if (!this.verifyStatusForm.valid) {
      this._alert.swalPopError("Please fill valid input!");
      this.verifyStatusForm.markAllAsTouched();

    } else {
      this._adminService.getAllOrderListToVerify(this.verifyStatusForm.value).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: (res: any) => {
          console.log(res);
          
          if (res.status == true || res.status == "success") {
            this._dialogRef.close(res);
            //   this._router.navigate(['Admin/product/product-list']);

            this._alert.swalPopSuccess("Payment has varified successfully.")
          } else {
            this._alert.swalPopError('something went wrong')
          }
        }
      })

    }
  }





  onSelectFrom(event: any){
    console.log(event);
    this.selectedFromDate= event;
  }
  onSelectTo(event: any){
    console.log(event);
    this.selectedToDate= event;
    const localDate = new Date(event.getTime() + Math.abs(event.getTimezoneOffset() * 60000));
    const formattedDate = localDate.toISOString().split('T')[0];
    this.verifyStatusForm.patchValue({deliveryDate: formattedDate});

    // this.verifyStatusForm.value.deleveryDate = this.selectedToDate;
    // console.log(this.verifyStatusForm.value);
    
  
    
  }


}
