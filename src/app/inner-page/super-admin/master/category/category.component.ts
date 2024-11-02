import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/common/services/common-service/alert.service';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';
import { UploadService } from 'src/app/common/services/common-service/upload.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  unsubscribe: Subject<any> = new Subject();
  CategoryForm!: FormGroup;

  displayedColumns: string[] = ['position', 'category_name','action'];
  dataSource!: MatTableDataSource<any>;
  paginationLength!: number
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  categoryList: Array<any> = [];



  // upload
  // brochureFileUploadRes: any
  // prefixViewPath = environment.fileUrl

  categoryMaster: Array<any> = [];
  constructor(
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _productService: ProductsService,
    private _uploadService: UploadService,
    private _router: Router,
  ) { }


  ngOnInit() {

    this.CategoryForm = this.addCatergoryForm();
    this.getCategoryMaster();

  }


  getCategoryMaster() {
    this._productService.getCategoryMaster().pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        console.log(res);

        this.categoryList = res.data.categories.map((item: any, index: number) => ({ ...item, tableIndex: index + 1 }));
        this.paginationLength = this.categoryList.length
        this.dataSource = new MatTableDataSource(this.categoryList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


      }
    })
  }
  
  addCatergoryForm() {
    return this._fb.group({
      category_name: ['', Validators.required],

    })
  }


  saveProduct(formVal: any) {
    console.log("hello");
    console.log(formVal.value);

    if (!this.CategoryForm.valid) {
      this._alert.swalPopError("Please fill valid input!");
      this.CategoryForm.markAllAsTouched();

    } else {
      this._productService.addCategory(formVal.value).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.status == 'success') {
            this.getCategoryMaster();
            // this._router.navigate(['superAdmin/product-list']);
            this._alert.swalPopSuccess("Category Saved Successfully.")
          } else {
            this._alert.swalPopError('something went wrong')
          }
        }
      })

    }

  }

  clearform() {
    this.CategoryForm.reset();
  }

  deleteCategory(category:any){
    console.log(category.id);
    this._productService.deleteCategoryById(category.id).pipe(takeUntil(this.unsubscribe)).subscribe({
      next:(res:any)=>{
        console.log(res);
        if(res.status =='success'){
          this.getCategoryMaster();
          this._alert.swalPopSuccess("Category Delete Successfully.")
          // this.getproductListData();
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
