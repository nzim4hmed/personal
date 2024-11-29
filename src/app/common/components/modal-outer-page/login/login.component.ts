import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from 'src/app/common/services/common-service/alert.service';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthServiceService } from 'src/app/common/services/authServices/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatDialogModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  hide: boolean = true; // This controls the visibility of the password
  constructor(
    private _dialogRef: MatDialogRef<LoginComponent>,
    private _alert: AlertService,
    private _fb: FormBuilder,
    private _productService: ProductsService,
    private _authService: AuthServiceService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public proposalData: any,
  ) { }

  ngOnInit() {
    this.loginForm = this.addLoginForm();
  }

  addLoginForm() {
    return this._fb.group({
      sponsor_id: ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  login(formVal: any) {
    console.log(formVal.value);

    if (!this.loginForm.valid) {
      this._alert.swalPopError('Please fill valid input');
      this.loginForm.markAllAsTouched();
    } else {
      formVal.value.sponsor_id = formVal.value.sponsor_id.trim().toUpperCase();
      formVal.value.password = formVal.value.password.trim();
      console.log(formVal);

      this._authService.login(formVal.value).subscribe({
        next: (res: any) => {
          console.log(res);
          console.log(res.status);

          if (res.status == true) {
            this._alert.swalPopSuccessTimer('You are logged In Successfully!');

            localStorage.setItem('token', JSON.stringify(res.data.token));
            localStorage.setItem('sessiondata', JSON.stringify(res));
            localStorage.setItem('loginUserdata', JSON.stringify(res.data.user));


            if (res.data.user.role == 'admin') {
              this._dialogRef.close(res);
              this._router.navigate(['AdminDashboard']);
            } else {
              this._dialogRef.close(res);
              this._router.navigate(['UserDashboard'])
            }
          } else {
            this._alert.swalPopError(res.message)
          }
        },
        error: (err: any) => {
          console.log('Login Error:', err);

          // Handle the specific error response
          if (err.statusCode == 401) {
            this._alert.swalPopError(err.message || 'Unauthorized');
          } else {
            this._alert.swalPopError(  (err.message || 'Unknown error'));
          }
        }
      })
    }
  }




  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

}
