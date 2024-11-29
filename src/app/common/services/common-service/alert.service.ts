import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  swalPopSuccess(textMsg:string){
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: textMsg,
      showConfirmButton: true,
    });
  }

  swalPopError(textMsg:string){
    Swal.fire({
      position: 'center',
      icon: 'error',
      text: textMsg,
      showConfirmButton: true,
    });
  }

  swalPopSuccessTimer(textMsg:string){
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: textMsg,
      timer:3000
    });
  }


  swalPopErrorTimer(textMsg:string){
    Swal.fire({
      position: 'center',
      icon: 'error',
      text: textMsg,
      timer:3000
    });
  }

  // swalPopErrorTimer1(textMsg:string){
  //   Swal.fire({
  //     position: 'center',
  //     icon: 'error',
  //     text: textMsg,
  //     timer:3000
  //   });
  // }

  swalPopWarningTimer(textMsg:string){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      text: textMsg,
      timer:2000
    });
  }
  // swalPopWarningTimer(textMsg:string){
  //   let timerInterval: any;
  //   Swal.fire({
  //     title: "Auto close alert!",
  //     html: "I will close in <b></b> milliseconds.",
  //     timer: 2000,
  //     timerProgressBar: true,
  //     didOpen: () => {
  //       Swal.showLoading();
  //       const timer = Swal.getPopup().querySelector("b");
  //       timerInterval = setInterval(() => {
  //         timer.textContent = `${Swal.getTimerLeft()}`;
  //       }, 100);
  //     },
  //     willClose: () => {
  //       clearInterval(timerInterval);
  //     }
  //   }).then((result) => {
  //     /* Read more about handling dismissals below */
  //     if (result.dismiss === Swal.DismissReason.timer) {
  //       console.log("I was closed by the timer");
  //     }
  //   });
  // }



  swalPopWarning(textMsg:string){
    Swal.fire({
      position: 'center',
      icon: 'warning',
      text: textMsg,
      showConfirmButton:true
    });
  }

  ShowWarning(title: string, timer?: number, body?: string | number, showConfirmButton?: boolean, confirmBtnText?: string) {
    Swal.fire({
      html: "<b>" + body + "</b>",
      position: 'center',
      title: title + '!',
      showConfirmButton: showConfirmButton ? showConfirmButton : false,
      // confirmButtonColor: "#376B78",
      confirmButtonText: confirmBtnText ? confirmBtnText : 'Ok',
      timer: timer,
      // width: 600,
      heightAuto: false
    });
  }

  showConfirmation(title: string, text: string, confirmButtonText: string) {
    return Swal.fire({
     title: title,
     text: text,
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: confirmButtonText
   })
 }

 showConfirmationforReg(title: string, sponsorId: string, password: string, confirmButtonText: string) {
  return Swal.fire({
    title: `
      <span style="color: #395f13;">${title}</span>
      <br>
      <span style="color: #395f13; font-size: 16px;">Your Registration Successfully Done</span>
    `,

    html: `
      <p><strong>Distributor ID:</strong> ${sponsorId}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>Please keep this information secure and do not share it with anyone.</p>
    `,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmButtonText
  });
}







}
