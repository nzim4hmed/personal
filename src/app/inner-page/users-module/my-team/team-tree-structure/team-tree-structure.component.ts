import { Component, Input, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';
import { Subject, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { AuthServiceService } from 'src/app/common/services/authServices/auth-service.service';




export interface User {
  id: number;
  sponsor_id: string;
  name: string;
  father_name: string;
  dob: string;
  gender: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  mobile_number: string;
  email: string;
  marital_status: string;
  gst_no: string;
  aadhar_no: string;
  nominee_name: string;
  relation: string;
  co_applicant_dob: string;
  bank_name: string;
  branch_name: string;
  account_number: string;
  ifsc_code: string;
  pan_number: string;
  password: string;
  role: string;
  parent_id: number;
  children: User[];
}

export interface TreeNode {
  data: User;
  type: string;
  children: TreeNode[];
}


@Component({
  selector: 'app-team-tree-structure',
  standalone: true,
  imports: [CommonModule, MatTreeModule, MatIconModule, MatFormFieldModule, FormsModule, OrganizationChartModule],
  templateUrl: './team-tree-structure.component.html',
  styleUrls: ['./team-tree-structure.component.scss']
})
export class TeamTreeStructureComponent implements OnInit {

  unsubscribe: Subject<any> = new Subject();
  datas: any
  filteredTreeStructure!: Node[]
  treeStructure!: User[];
  modifiedData!: TreeNode[];
  selectedNodes!: TreeNode[];
  userDetails = this._authenticationService.getLoginUserData();
  constructor(
    private _productService: ProductsService,
    private _authService: AuthServiceService,
    private _authenticationService: AuthenticationService
  ) { }
  ngOnInit() {
    this.getTreeStructure()
  }
  getTreeStructure() {
    this._authService.verifySponsorId(this.userDetails.sponsor_id).subscribe({
      next: (res: any) => {
        this.treeStructure = Array.isArray(res.data) ? res.data : [res.data];
        console.log(this.treeStructure);
        this.modifiedData = this.addTypeToNodes(this.treeStructure);
      }
    })
  }

  addTypeToNodes(nodes: User[]): TreeNode[] {
    return nodes.map((node:any) => ({
        ...node,
        type: "person",
        children: node.children ? this.addTypeToNodes(node.children) : []
    }));
}





// searchTree(sponsorID: string) {
//   if (!sponsorID) {
//     this.modifiedData = this.addTypeToNodes(this.treeStructure); // Reset to original data if search is cleared
//     return;
//   }
//   this.modifiedData = this.filterNodesBySponsorId(this.treeStructure, sponsorID);
// }

// filterNodesBySponsorId(nodes: User[], sponsorID: string): TreeNode[] {
//   let filteredNodes: TreeNode[] = [];

//   nodes.forEach(node => {
//     if (node.sponsor_id.includes(sponsorID)) {
//       filteredNodes.push({ 
//         data: node,
//         type: 'person',
//         children: this.addTypeToNodes(node.children || []) 
//       });
//     } else if (node.children) {
//       const filteredChildren = this.filterNodesBySponsorId(node.children, sponsorID);
//       if (filteredChildren.length) {
//         filteredNodes.push({ 
//           data: node,
//           type: 'person',
//           children: filteredChildren 
//         });
//       }
//     }
//   });

//   return filteredNodes;
// }




}

