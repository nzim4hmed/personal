import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { Profile1Component } from "../../../../common/components/modal-inner-pages/profile1/profile1.component";
import { Contact1Component } from "../../../../common/components/modal-inner-pages/contact1/contact1.component";
import { ActivityTimeline1Component } from "../../../../common/components/modal-inner-pages/activity-timeline1/activity-timeline1.component";
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/common/services/common-service/alert.service';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/common/services/authServices/auth-service.service';

@Component({
  selector: 'app-profile-update',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatTabsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, Profile1Component, ReactiveFormsModule],
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {
  unsubscribe: Subject<any> = new Subject();
  userDetails: any
  updateProfileForm!: FormGroup
  constructor(
    private _authenticationService: AuthenticationService,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _productService: ProductsService,
    private _authService: AuthServiceService,
  
    private _router: Router
  ) {
  }


  ngOnInit(): void {
    this.userDetails = this._authenticationService.getLoginUserData()
    console.log(this.userDetails);
    
    const date = new Date(this.userDetails.dob);
    const year = date.getFullYear();
    console.log(typeof year);
    console.log(this.updateProfileForm);

    if (year == 1990) {this.userDetails.dob ='';}
   
    console.log(this.userDetails.dob);
    
    this.updateProfileForm = this.updateUser(this.userDetails)
    console.log(this.userDetails);
    this.verifyIDOnChange(this.userDetails.sponsor_id)

    // const date = new Date(this.userDetails.dob);
    // const year = date.getFullYear();
    // console.log(typeof year);
    // console.log(this.updateProfileForm);

    // if (year == 1900) {
    //   this.updateProfileForm.value.dob =''
    // }
    console.log(this.updateProfileForm.value);
    console.log(this.updateProfileForm.value.dob);
    
  }

  updateUser(userDetials: any) {
    return this._fb.group({
      id: [userDetials.id],
      sponsor_id: [{ value: userDetials?.sponsor_id, disabled: true }],
      sponsor_name: [{ value: '', disabled: true }],
      name: [userDetials.name, Validators.required],
      dob: [userDetials?.dob || '', Validators.required],
      gender: [userDetials?.gender || '', Validators.required],
      address: [userDetials?.address || '', Validators.required],
      state: [userDetials?.state || '', Validators.required],
      city: [userDetials?.city || '', Validators.required],
      pincode: [userDetials.pincode ||'', Validators.required],
      mobile_number: ['', Validators.required],
      email: ['', Validators.pattern],
      marital_status: [userDetials?.maritalStatus || '', Validators.required],
      nominee_name: [''],
      relation: [''],
      co_applicant_dob: ['',],
      bank_name: [''],
      branch_name: [''],
      account_number: [''],
      ifsc_code: [''],
      pan_number: ['', Validators.required],
      password: ['', Validators.required],
      full_name: ['', Validators.required],
      // gst_no: ['removed'],
      aadhar_no: ['removed'],
      role: ['user']
    })
  }


  saveUserDetails(formVal: any) {
    console.log(formVal.value);


    if (!this.updateProfileForm.valid) {
      this._alert.swalPopError('Please enter valid input');
      this.updateProfileForm.markAllAsTouched();
    } else {
      delete formVal.value.sponsor_name

      console.log(formVal.value);
      formVal.value.sponsor_id = formVal.value.sponsor_id.trim();
      formVal.value.password = formVal.value.password.trim();

      this._authService.registration(formVal.value).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.error == false) {
            this._alert.showConfirmationforReg('Welcome to the ALWAYS GEENLIVE Family!', res.results.data.sponsor_id, res.results.data.password, 'Confirm');
            this.updateProfileForm.reset();
            // this._router.navigate(['home']);
            // this.loginPopUp();b

          } else if (res.error == true) {
            this._alert.swalPopError(res.message);
          }
        }
      })
    }
  }

  verifyIDOnChange(sponsorId: any) {

    if (sponsorId != '') {
      this._authService.verifySponsorId(sponsorId.trim()).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.error == true) {
            this._alert.swalPopWarning(res.message)
            this.updateProfileForm?.patchValue({
              'sponsor_name': '',
              'sponsor_id': ''
            });
          } else if (res.error == false) {
            this.updateProfileForm.patchValue({
              'sponsor_name': res.results.name,
            })
          }
        }
      })
    } else {
      this.updateProfileForm.patchValue({
        'sponsor_name': '',
      })
    }

  }









}
