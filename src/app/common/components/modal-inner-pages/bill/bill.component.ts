import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/app/material.module';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  products: any[] = [];
  grandTotal: number = 0;
  grandTotalInWords:any

  @ViewChild('reportContent', { static: false }) reportContent!: ElementRef;

  constructor(
    private _dialogRef: MatDialogRef<BillComponent>,

    @Inject(MAT_DIALOG_DATA) public viewBillDetails: any,
  ) { }
  
  ngOnInit(): void {
    console.log(this.viewBillDetails);
    this.grandTotal = this.calculateGrandTotal();
    this.grandTotalInWords = this.convertToWords(this.grandTotal);
    // Initialization logic
  }

  calculateTax(amount: number, taxRate: string, type: 'CGST' | 'SGST' | 'IGST'): number {
    const rate = parseFloat(taxRate.replace('GST@', ''));
    const halfRate = rate / 2;

    if (type === 'CGST' || type === 'SGST') {
      return (amount * halfRate) / 100;
    } else if (type === 'IGST') {
      return (amount * rate) / 100;
    }
    return 0;
  }

  calculateGrandTotal(): number {
    return this.viewBillDetails.cart.product.reduce((total: any, item: { total_price: any; }) => total + item.total_price, 0);
  }

  downloadPdf() {
    const content = this.reportContent.nativeElement;

    html2canvas(content, { logging: true, useCORS: true }).then((canvas) => {
      const imgWidth = 190; // PDF width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
      const imgData = canvas.toDataURL('image');

      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('Generated_Bill.pdf');
    }).catch((error) => {
      console.error('Error generating PDF:', error);
    });
  }






  convertToWords(amount: number): string {
    const ones = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const tens = [
      "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];
    const scales = ["", "Thousand", "Million", "Billion", "Trillion"];
  
    if (amount === 0) return "Zero";
  
    let words = "";
  
    // Convert the number to string and split into groups of 3 digits
    const numString = amount.toString();
    const numGroups = Math.ceil(numString.length / 3);
    const paddedNum = numString.padStart(numGroups * 3, "0");
    const groups = [];
  
    for (let i = 0; i < numGroups; i++) {
      groups.push(parseInt(paddedNum.substr(i * 3, 3), 10));
    }
  
    groups.forEach((group, index) => {
      if (group === 0) return;
  
      const scaleIndex = groups.length - 1 - index;
  
      const hundred = Math.floor(group / 100);
      const rest = group % 100;
  
      if (hundred > 0) {
        words += `${ones[hundred]} Hundred `;
      }
  
      if (rest > 0) {
        if (rest < 20) {
          words += `${ones[rest]} `;
        } else {
          const ten = Math.floor(rest / 10);
          const unit = rest % 10;
          words += `${tens[ten]} ${ones[unit]} `;
        }
      }
  
      words += `${scales[scaleIndex]} `;
    });
  
    return words.trim();
  }
  
}
