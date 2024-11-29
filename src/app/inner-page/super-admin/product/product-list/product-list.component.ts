import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';
import { AlertService } from 'src/app/common/services/common-service/alert.service';
import { environment } from 'src/environments/environment';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProductComponent } from 'src/app/common/components/modal-inner-pages/update-product/update-product.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'category_name', 'mrp', 'dp', 'bv', 'st', 'sq','hsn_no', 'taxRate', 'description', 'img', 'action'];
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
    this.getproductListData();

  }
  getproductListData() {
    this._productService.getProductList().pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        console.log(res);

        this.proposalList = res.data.products;
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

  updateProduct(productDetail: any) {
    const dialogRef = this._dialog.open(UpdateProductComponent, {
      width: '750px',
      maxHeight: '600px',
      data: productDetail,
      autoFocus: false,
      panelClass: 'commonDialogBox',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getproductListData()
      }
      console.log(`Dialog result: ${result}`);
    });

  }



  deleteProduct(productId: any) {
    console.log(productId.id);
    this._productService.deleteProductById(productId.id).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.status == 'success') {

          this._alert.swalPopSuccess("Product Delete Successfully.")
          this.getproductListData();
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








