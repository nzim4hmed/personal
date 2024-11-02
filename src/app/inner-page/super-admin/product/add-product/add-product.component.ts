import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/common/services/common-service/alert.service';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';
import { UploadService } from 'src/app/common/services/common-service/upload.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  unsubscribe: Subject<any> = new Subject();
  ProductForm!: FormGroup;

  // upload
  brochureFileUploadRes: any
  prefixViewPath = environment.fileUrl

  imageSrc: any

  categoryMaster: Array<any> = [];
  constructor(
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _productService: ProductsService,
    private _uploadService: UploadService,
    private _router: Router,
  ) { }


  ngOnInit() {

    this.ProductForm = this.addProductform();
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

  addProductform() {
    return this._fb.group({
      category_id: ['', Validators.required],
      product_name: ['', Validators.required],
      product_image: [''],
      mrp: ['', Validators.required],
      dp: ['', Validators.required],
      business_volume: ['', Validators.required],
      sales_point_value: [10],
      stock_type: ['', Validators.required],
      stock_qty: ['', Validators.required],
      tax_rate: ['', Validators.required],
      description: ['', Validators.required],
    })
  }


  saveProduct(formVal: any) {
    console.log("hello");
    console.log(formVal.value);
    if (!this.ProductForm.valid) {
      this._alert.swalPopError("Please fill valid input!");
      this.ProductForm.markAllAsTouched();

    } else {
      this._productService.addProduct(formVal.value).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: (res: any) => {
          console.log(res);
          
          if (res.status == 'success') {

            this._router.navigate(['Admin/product/product-list']);
            this._alert.swalPopSuccess("Product Saved Successfully.")
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

  getImage(fileName: string) {
    this._productService.getFile(fileName).subscribe({
      next: (res: Blob) => {
        const objectURL = URL.createObjectURL(res);
        this.imageSrc = objectURL;
      },
      error: (err) => {
        console.error('Error fetching image:', err);
      }
    });
  }



}
