import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from 'src/app/common/services/common-service/alert.service';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/common/services/common-service/upload.service';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})

export class UpdateProductComponent implements OnInit {
  unsubscribe: Subject<any> = new Subject();
  ProductForm!: FormGroup;

  // upload
  brochureFileUploadRes: any
  prefixViewPath = environment.fileUrl

  categoryMaster: Array<any> = [];

  constructor(
    private _dialogRef: MatDialogRef<UpdateProductComponent>,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _productService: ProductsService,
    private _uploadService: UploadService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public productData: any,
  ) { }

  ngOnInit() {
    console.log(this.productData);

    this.ProductForm = this.addProductform(this.productData);
    this.getCategoryMaster();
  }
  getCategoryMaster() {
    this._productService.getCategoryMaster().pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        console.log(res);
        this.categoryMaster = res.data.categories;

      }
    })
  }

  addProductform(data: any) {
    console.log(data);

    return this._fb.group({
      id: [data?.id || '', Validators.required],
      category_id: [data?.category_id || '', Validators.required],
      product_name: [data?.product_name || '', Validators.required],
      product_image: [data?.product_image || ''],
      mrp: [data?.mrp || '', Validators.required],
      dp: [data?.dp || '', Validators.required],
      business_volume: [data?.business_volume || '', Validators.required],
      sales_point_value: [10],
      stock_type: [data?.stock_type || '', Validators.required],
      stock_qty: [data?.stock_qty || '', Validators.required],
      tax_rate: [data?.tax_rate || '', Validators.required],
      description: [data?.description || '', Validators.required],
      hsn_no: ['', Validators.required],
    })
  }


  saveProduct(formVal: any) {
    console.log("hello");
    console.log(formVal.value);
    formVal.value.hsn_no = formVal.value.hsn_no.toString();
    if (!this.ProductForm.valid) {
      this._alert.swalPopError("Please fill valid input!");
      this.ProductForm.markAllAsTouched();

    } else {
      this._productService.addProduct(formVal.value).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.status == 'success') {
            this._dialogRef.close(res);  
            this._router.navigate(['Admin/product/product-list']);
            
            this._alert.swalPopSuccess("Product Updated Successfully.")
          } else {
            this._alert.swalPopError('something went wrong')
          }
        }
      })

    }

  }

  clearform() {
    this.ProductForm.reset();
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
            formData.append("file", files[i], files[i].name);
            // formData.append("path", "documents\\International");
            // formData.append("uploadType", "3");
          }

          console.log(formData);


          this._uploadService.upload(formData).subscribe({
            next: (res: any) => {
              console.log(res);

              console.log(res.data.file);
              this.brochureFileUploadRes = res;
              if (this.brochureFileUploadRes.status == 'success') {
                this.swalFileUploadSuccess()
                this.ProductForm.get('product_image')?.setValue(this.brochureFileUploadRes.data.file.filename)
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
          this._alert.ShowWarning("File size must be below 1MB", 0, "Please check file size and try again")
        }
      }
      else {
        this._alert.ShowWarning('Only pdf and images files is allowed!')
      }
    }
  }




}
