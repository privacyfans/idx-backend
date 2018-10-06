import { Component, AfterViewInit, OnInit } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxNotificationService } from 'ngx-notification';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./user-inputs.component.scss'],
  templateUrl: './user-inputs.component.html',
})
export class userInputsComponent implements OnInit, AfterViewInit{
  
  formuser: FormGroup;
  
  
constructor(
  private router: Router,
  private formBuilder: FormBuilder,
  private _userService: UserService,
  private ngxNotificationService: NgxNotificationService
){
}
  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    
    this.formuser = this.formBuilder.group({
      Id: [null, Validators.required],
      Name: [null, Validators.required],
      Email: [null, Validators.required],
      is_Admin: [null, Validators.required],
      Password: [null, Validators.required],
      
      
    });
  }
  

  saveuser() {
    console.log(this.formuser.value);
    if (this.formuser.valid) {
      this._userService.create(this.formuser.value).subscribe(res => {
        this.ngxNotificationService.sendMessage('Input user data success.', 'success', 'bottom-right')
        setTimeout(() => {
          this.router.navigate(['pages/user/list']);
        }, 1000); 
      }, 
      (err: HttpErrorResponse) => {
        // console.log("Get all data Leave error. Error code: ", err)
        //this._notificationsService.error('Error','Get all data Leave error. Error code: ' + err
        this.ngxNotificationService.sendMessage('Input new data error.<br>'+ err, 'error', 'bottom-right')
      //)
      });
    } else {
      // console.log('error validasi');
      this.validateAllFormFields(this.formuser);
    }
  }
  
  
    
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      // console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  isFieldValid(field: string) {
    return !this.formuser.get(field).valid && this.formuser.get(field).touched;
  }
}
