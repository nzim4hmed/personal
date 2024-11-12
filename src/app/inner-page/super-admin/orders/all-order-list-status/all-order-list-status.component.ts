import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { ADminService } from 'src/app/common/services/superAdminService/admin.service';
import { AlertService } from 'src/app/common/services/common-service/alert.service';
import { UserService } from 'src/app/common/services/superAdminService/user.service';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentByClietComponent } from 'src/app/common/components/modal-inner-pages/payment-by-cliet/payment-by-cliet.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/material.module';
import { VerifyStatusComponent } from 'src/app/common/components/modal-inner-pages/verify-status/verify-status.component';
import { ZoomHoverDirective } from 'src/app/common/_helpers/directives/zoom-hover.directive';
import { ViewProductModalComponent } from 'src/app/common/components/modal-inner-pages/view-product-modal/view-product-modal.component';

@Component({
  selector: 'app-all-order-list-status',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MaterialModule, MatInputModule],
  templateUrl: './all-order-list-status.component.html',
  styleUrls: ['./all-order-list-status.component.scss']
})
export class AllOrderListStatusComponent {
  displayedColumns: string[] = ['sr_no','order_number', 'transacation_id','order_status', 'purchase_type', 'payment_status_client','payment_service', 'status' , 'shipping_address',   'total_amount', 'remarks', 'view_product','verifystatus'];

  // displayedColumns: string[] = ['sr_no','product_image', 'product_name', 'category_name', 'quantity', 'price_per_unit', 'total_amount','client_status', 'status', 'verifystatus'];
  dataSource!: MatTableDataSource<any>;
  paginationLength!: number
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  prefixViewPath = environment.fileUrl

  proposalList: Array<any> = [];

  // dataSource = ELEMENT_DATA;
  unsubscribe: Subject<any> = new Subject();

  constructor(
    private _adminService: ADminService,
    // private _dialog: MatDialog,


    private _userService: UserService,
    private _authService: AuthenticationService,
    private _dialog: MatDialog,
    private _alert: AlertService,
  ) { }


  ngOnInit() {
    this.getproductListData();

  }
  getproductListData() {
    this._adminService.getAllOrder().pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {

        console.log(res);


        this.proposalList = res.data.map((item: any, index: number) => ({ ...item, tableIndex: index + 1 }));
        // this.categoryList = res.data.categories.map((item: any, index: number) => ({ ...item, tableIndex: index + 1 }));
        this.paginationLength = this.proposalList.length
        this.dataSource = new MatTableDataSource(this.proposalList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


      }
    })
  }

  verifying(productDetail: any) {

    const dialogRef = this._dialog.open(VerifyStatusComponent, {
      // width: '100%',
      // maxHeight: '600px',
      panelClass: 'custom-dialog-container',
      data: productDetail,
      autoFocus: false,
      // panelClass: 'commonDialogBox',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getproductListData()
      }
      console.log(`Dialog result: ${result}`);
    });

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewProduct(productDetail: any) {
    
    const dialogRef = this._dialog.open(ViewProductModalComponent, {
      width: '100%',
      // maxHeight: '600px',
      panelClass: 'custom-dialog-container' ,
      data: productDetail,
      autoFocus: false,
      // panelClass: 'commonDialogBox',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        //  this.getAllOrderHistory()
      }
      console.log(`Dialog result: ${result}`);
    });

  }

}
