import { Component, Inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';
import { UploadService } from 'src/app/common/services/common-service/upload.service';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';
import { environment } from 'src/environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/app/material.module';
import { CheckoutList } from '../../interfaces/agl.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-product-modal',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatInputModule, MatFormFieldModule, CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './view-product-modal.component.html',
  styleUrls: ['./view-product-modal.component.scss']
})
export class ViewProductModalComponent {
  unsubscribe: Subject<any> = new Subject();
  PaymentUpload!: FormGroup;

  // upload
  brochureFileUploadRes: any
  prefixViewPath = environment.fileUrl
  prefixforpayment = environment.paymentfile

  categoryMaster: Array<any> = [];
  userDetails: any

  proposalList: Array<any> = [];

     displayedColumns: string[] = ['product_image', 'product_name','quantity','bv_per_unit','bv', 'price_per_unit',  'total_amount'];
    // displayedColumns: string[] = ['sr_no','order_number', 'transacation_id','order_status', 'purchase_type', 'payment_status_client','payment_service', 'status' , 'shipping_address',   'total_amount', 'remarks', 'view_product','payment'];
    dataSource = new MatTableDataSource<any>([]);
    paginationLength!: number
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    
  constructor(
    private _dialogRef: MatDialogRef<ViewProductModalComponent>,
    // private _fb: FormBuilder,
    // private _alert: AlertService,
    private _productService: ProductsService,
    private _uploadService: UploadService,
    private _authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public productData: any,
  ) { }

  ngOnInit() {
    console.log(this.productData);
    this.userDetails = this._authService.getLoginUserData();
   
this.getallproductbycartId()


  }
  getallproductbycartId(){

    console.log(this.productData?.cart?.product);
    
     
    this.proposalList = this.productData?.cart?.product?.map((item: any, index: number) => ({ ...item, tableIndex: index + 1 }));
    console.log(this.proposalList);
    
    this.paginationLength = this.proposalList.length
    this.dataSource = new MatTableDataSource(this.proposalList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


 

  selectedFile: File | null = null;



  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
