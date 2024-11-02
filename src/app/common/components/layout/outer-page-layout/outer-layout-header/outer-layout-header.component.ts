import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../../../modal-outer-page/login/login.component';

@Component({
  selector: 'app-outer-layout-header',
  standalone: true,
  imports: [CommonModule,RouterModule, MatDialogModule],
  templateUrl: './outer-layout-header.component.html',
  styleUrls: ['./outer-layout-header.component.scss']
})
export class OuterLayoutHeaderComponent implements OnInit {
 constructor(
  private _dialog: MatDialog
 ){}
 
  ngOnInit() {
   
  }

  loginPopUp(){
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

}
