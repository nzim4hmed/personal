import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/common/services/common-service/alert.service';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';
import { UploadService } from 'src/app/common/services/common-service/upload.service';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';
import { environment } from 'src/environments/environment';
import { PaymentByClietComponent } from '../payment-by-cliet/payment-by-cliet.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-view-payment-details',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatInputModule, MatFormFieldModule, CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './view-payment-details.component.html',
  styleUrls: ['./view-payment-details.component.scss']
})
export class ViewPaymentDetailsComponent {
  unsubscribe: Subject<any> = new Subject();
  PaymentUpload!: FormGroup;

  // upload
  brochureFileUploadRes: any
  prefixViewPath = environment.fileUrl
  prefixforpayment = environment.paymentfile
  paymentFileName :any

  categoryMaster: Array<any> = [];
  userDetails: any
  constructor(
    private _dialogRef: MatDialogRef<PaymentByClietComponent>,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _productService: ProductsService,
    private _uploadService: UploadService,
    private _authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public viewPaymentDetails: any,
  ) { }

  ngOnInit() {
    console.log(this.viewPaymentDetails);
    this.userDetails = this._authService.getLoginUserData();
    this.PaymentUpload = this.addProductform(this.viewPaymentDetails);

    const fullPath = this.viewPaymentDetails.payment_ss_client;
    this.paymentFileName = fullPath.split('/').pop();
    console.log(this.paymentFileName);
    

  }


  addProductform(data: any) {
    console.log(data);
    

    return this._fb.group({
      checkout_id: [this.viewPaymentDetails?.checkout_id || '', Validators.required],
      userid: [this.userDetails.id || '', Validators.required],
      payment_status: ['Completed' , Validators.required],
      order_number: [this.viewPaymentDetails?.order_number || '', Validators.required],
      paymentfileName: [ ''],


    })
  }

  selectedFile: File | null = null;



  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }



  submitPayment() {

    console.log(this.PaymentUpload);
    delete this.PaymentUpload.value.paymentfileName;
    console.log(this.PaymentUpload);
  
    if (!this.PaymentUpload.valid) {
      this._alert.swalPopError("Please fill valid input!");
      this.PaymentUpload.markAllAsTouched();

    } else {
      this._productService.submitPayment(this.PaymentUpload.value).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.status == 'success') {
            this._dialogRef.close(res);  
            //   this._router.navigate(['Admin/product/product-list']);
            
            this._alert.swalPopSuccess("Thank You, Payment has submitted successfully.")
          } else {
            this._alert.swalPopError('something went wrong')
          }
        }
      })

    }
  }

}
