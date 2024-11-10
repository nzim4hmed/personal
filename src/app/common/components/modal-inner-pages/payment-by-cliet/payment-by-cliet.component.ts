import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/common/services/common-service/alert.service';
import { UploadService } from 'src/app/common/services/common-service/upload.service';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';

@Component({
  selector: 'app-payment-by-cliet',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatInputModule, MatFormFieldModule, CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './payment-by-cliet.component.html',
  styleUrls: ['./payment-by-cliet.component.scss']
})
export class PaymentByClietComponent {
  unsubscribe: Subject<any> = new Subject();
  PaymentUpload!: FormGroup;

  // upload
  brochureFileUploadRes: any
  prefixViewPath = environment.fileUrl
  prefixforpayment = environment.paymentfile

  categoryMaster: Array<any> = [];
  userDetails: any
  constructor(
    private _dialogRef: MatDialogRef<PaymentByClietComponent>,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _productService: ProductsService,
    private _uploadService: UploadService,
    private _authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public productData: any,
  ) { }

  ngOnInit() {
    console.log(this.productData);
    this.userDetails = this._authService.getLoginUserData();
    this.PaymentUpload = this.addProductform(this.productData);

  }


  addProductform(data: any) {
    console.log(data);
    

    return this._fb.group({
      // checkout_id: [this.productData?.checkout_id || '', Validators.required],
      userId: [this.userDetails.id || '', Validators.required],
      payment_status: ['Completed' , Validators.required],
      order_status: ['Confirmed' , Validators.required],
      transaction_id: [this.productData?.transacation_id ||'' , Validators.required],
      order_number: [this.productData?.order_number || '', Validators.required],
      payment_service: ['OTHER', ],
      other_payment_service: [ 'other', ],
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



  // ---------------------------------To Upload Brochure ------------------------------------------------//
  swalFileUploadSuccess() {
    this._alert.swalPopSuccessTimer("File Uploaded")
  }
  swalFileUploadError(errMsg: any) {
    this._alert.swalPopErrorTimer(errMsg)
  }
  verifyDocumentFileExtension(files: any) {
    var fileIndex = files[0].name.lastIndexOf(".") + 1;
    var extFile = files[0].name.substr(fileIndex, files[0].name.length).toLowerCase();
    return extFile
  }
  verifyFileSize(files: any) {
    var fileSize = files[0].size
    return fileSize
  }
  uploadDocumentFile(files: any) {
    console.log(files);

    if (files.length === 0) {
      return;
    } else {
      
      var extFile = this.verifyDocumentFileExtension(files)
      if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "pdf") {
        var fileSize = this.verifyFileSize(files)
        if (fileSize <= 2097152) {
          const formData = new FormData();
          for (let i = 0; i < files.length; i++) {
            formData.append("payment", files[i], files[i].name);
          }

          console.log(formData);
          
          formData.append("user_id", this.userDetails.id);
          formData.append("order_number", this.productData.order_number);
          this._uploadService.paymentInfoUpload(formData).subscribe({
            next: (res: any) => {
              console.log(res);
              

              console.log(res.data.file);   
              this.brochureFileUploadRes = res;
              if (this.brochureFileUploadRes.status == 'success') {
                this.swalFileUploadSuccess()
                this.PaymentUpload.get('paymentfileName')?.setValue(this.brochureFileUploadRes.data.file.filename)
                console.log(this.PaymentUpload.get('paymentfileName')?.setValue(this.brochureFileUploadRes.data.file.filename))
                console.log(this.brochureFileUploadRes.data.file.filename);
                
                // this.getImage(this.brochureFileUploadRes.data.file.filename);
              } else {
                var errMsg
                if (this.brochureFileUploadRes.status == 'fail') {
                  errMsg = this.brochureFileUploadRes.message
                } else {
                  errMsg = 'Failed Please Try Again!'
                }
                this.swalFileUploadError(errMsg)
              }
            }
          })
        } else {
          this._alert.ShowWarning("File size must be below 2MB", 0, "Please check file size and try again")
        }
      }
      else {
        this._alert.ShowWarning('Only pdf and images files is allowed!')
      }
    }
  }
}
