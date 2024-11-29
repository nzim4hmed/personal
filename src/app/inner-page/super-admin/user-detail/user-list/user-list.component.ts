import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/common/services/common-service/alert.service';
import { MaterialModule } from 'src/app/material.module';
import { ConfirmationModalComponent } from 'src/app/common/components/modal-inner-pages/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'sponsor_id', 'email', 'gender', 'dob','joining_date' ,'mobile_number','pan_number', 'marital_status', 'state', 'city', 'address', 'status'];
  dataSource!: MatTableDataSource<any>;
  paginationLength!: number
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  prefixViewPath = environment.fileUrl

  proposalList: Array<any> = [];

  // dataSource = ELEMENT_DATA;
  unsubscribe: Subject<any> = new Subject();

  constructor(
    private _productService: ProductsService,
    private _dialog: MatDialog,
    private _alert: AlertService,

  ) { }


  ngOnInit() {
    this.getuserTree();

  }
  getuserTree() {
    this._productService.getUsersList().pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        console.log(res);

        this.proposalList = res.data;
        this.paginationLength = this.proposalList.length
        this.dataSource = new MatTableDataSource(this.proposalList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


      }
    })
  }





  viewImage(val: any) {
    console.log(val);


  }

  updateStatus(productDetail: any) {
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      maxWidth: "400px",
      maxHeight: '600px',
      data: productDetail,
      autoFocus: false,
      panelClass: 'commonDialogBox',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getuserTree()
      }
      console.log(`Dialog result: ${result}`);
    });

  }



  deleteProduct(productId: any) {
    console.log(productId.id);
    this._productService.deleteProductById(productId.id).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.error == false) {

          this._alert.swalPopSuccess("Product Delete Successfully.")
          this.getuserTree();
        } else {
          this._alert.swalPopError('something went wrong')
        }
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




}
