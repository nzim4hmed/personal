import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertService } from 'src/app/common/services/common-service/alert.service';
import { ADminService } from 'src/app/common/services/superAdminService/admin.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/common/services/superAdminService/user.service';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';
import { Checkout, CheckoutList } from 'src/app/common/components/interfaces/agl.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';
import { MaterialModule } from 'src/app/material.module';
import { PaymentByClietComponent } from 'src/app/common/components/modal-inner-pages/payment-by-cliet/payment-by-cliet.component';
import { MatInputModule } from '@angular/material/input';
import { ViewPaymentDetailsComponent } from 'src/app/common/components/modal-inner-pages/view-payment-details/view-payment-details.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MaterialModule, MatInputModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit{
  displayedColumns: string[] = ['sr_no','product_image', 'product_name', 'category_name', 'quantity', 'price_per_unit',  'total_amount', 'payment_status_client','transaction_id', 'status' , 'payment'];
  dataSource = new MatTableDataSource<CheckoutList>([]);
  paginationLength!: number
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  prefixViewPath = environment.fileUrl

  proposalList: Array<any> = [];

  // dataSource = ELEMENT_DATA;
  userDetails: any

  unsubscribe: Subject<any> = new Subject();

  constructor(
    private _userService: UserService,
    private _authService: AuthenticationService,
    private _dialog: MatDialog,
    private _alert: AlertService,

  ) { }


  ngOnInit() {
    this.userDetails = this._authService.getLoginUserData();
    this.getAllOrderHistory();
    console.log(this.userDetails);

  }
  getAllOrderHistory() {
    this._userService.getAllOrderByUserID(this.userDetails.sponsor_id).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        console.log(res);
        
      
        this.proposalList = res.data.map((item: any, index: number) => ({ ...item, tableIndex: index + 1 }));
        this.paginationLength = this.proposalList.length
        this.dataSource = new MatTableDataSource(this.proposalList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


      }
    })
  }

  makePayment(productDetail: any) {
    
    const dialogRef = this._dialog.open(PaymentByClietComponent, {
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

         this.getAllOrderHistory()
      }
      console.log(`Dialog result: ${result}`);
    });

  }
  veiwPayment(productDetail: any) {
    
    const dialogRef = this._dialog.open(ViewPaymentDetailsComponent, {
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

         this.getAllOrderHistory()
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
}
