import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AlertService } from 'src/app/common/services/common-service/alert.service';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/common/components/modal-outer-page/login/login.component';
import { Subject, takeUntil } from 'rxjs';
import { passwordValidator } from 'src/app/common/_helpers/validationfn';
import { MatIconModule } from '@angular/material/icon';
import { AuthServiceService } from 'src/app/common/services/authServices/auth-service.service';


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RouterModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup
  hide: boolean = true; // This controls the visibility of the password

  unsubscribe: Subject<any> = new Subject();

  constructor(
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _productService: ProductsService,
    private _authService: AuthServiceService,
    private _dialog: MatDialog,
    private _router: Router,
    private _cdr: ChangeDetectorRef
  ) {

  }
  ngOnInit() {
    this.registrationForm = this.addUser()
  }


  addUser() {
    return this._fb.group({
      sponsor_id: ['', Validators.required],
      sponsor_name: [''],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      mobile_number: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email]) ],
    
      marital_status: ['', Validators.required],
      nominee_name: [''],
      relation: [''],
      co_applicant_dob: ['',],
      bank_name: [''],
      branch_name: [''],
      account_number: [''],
      ifsc_code: [''],
      pan_number: ['', Validators.required],
      password: ['', [Validators.required, passwordValidator()]],
      full_name: ['fullname Extra', Validators.required],
      // gst_no: ['removed'],
      aadhar_no: [null],
      role: ['user'],
      parent_sponsor_id: [''],
    })
  }


  saveUserDetails(formVal: any) {
    console.log(formVal.value);

    console.log(this.registrationForm.controls);
    // Example method to log form control errors

    const passwordControl = this.registrationForm.get('password');
    if (passwordControl?.hasError('passwordInvalid')) {
      console.log('Password is invalid');
    }



    if (!this.registrationForm.valid) {
      this._alert.swalPopError('Please enter valid input');
      this.registrationForm.markAllAsTouched();
    } else {
      delete formVal.value.sponsor_name

      console.log(formVal.value);
      formVal.value.sponsor_id = formVal.value.sponsor_id.trim();
      formVal.value.password = formVal.value.password.trim();

      this._authService.registration(formVal.value).subscribe({
        next: (res: any) => {

          console.log(res);
          
      if(res.statusCode ==200){
        this._alert.showConfirmationforReg('Welcome to the ALWAYS GEENLIVE Family!', res.data.sponsor_id, res.data.password, 'Confirm');
        this.registrationForm.reset();
        this._router.navigate(['home']);
        // this.loginPopUp();
      }else{
        this.registrationForm.reset();
        this._alert.swalPopError(res.message);
      }

        },
        error: (err: any) => { 
          // this.registrationForm.reset();
          console.log('End of error block'); 
        }
        
        
      });
      
    }
  }

  loginPopUp() {
    const dialogRef = this._dialog.open(LoginComponent, {
      //  width: '750px',
      data: 'proposaldata',
      autoFocus: false,
      panelClass: 'commonDialogBox',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
      console.log(`Dialog result: ${result}`);
    });

  }


  verifyIDOnChange(sponsorId: any) {

    if (sponsorId != '') {
      this._authService.verifybySponsorId(sponsorId.trim()).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: (res: any) => {

          console.log(res);

          if (res?.data != null && res?.data != '') {
            this._alert.swalPopSuccessTimer(res.message)
            this.registrationForm?.patchValue({
              'sponsor_name': res.data.name,
              'parent_sponsor_id': res.data.sponsor_id,
              // 'nominee_name': res.data.sponsor_id,

            });
          } else {
            this._alert.swalPopWarning('User Not Exist!')
            this.registrationForm.patchValue({
              'sponsor_name': '',
              'sponsor_id': '',
              'parent_sponsor_id': '',
            })
          }
        },
        error: (err: any) => {
          console.log(err);
          if (err.status == 404) {
            this._alert.swalPopError(err.error.message);
            this.registrationForm?.patchValue({
              'sponsor_name': '',
              'sponsor_id': ''
            });
          } else {
            this._alert.swalPopError('An error occurred: ' + err.message);
          }
        }
      })
    } else {
      this.registrationForm.patchValue({
        'sponsor_name': '',
      })
    }

  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }



}
