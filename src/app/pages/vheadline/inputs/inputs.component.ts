import { Component, AfterViewInit, OnInit } from '@angular/core';
import { vheadlineService } from '../../../_services/vheadline.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxNotificationService } from 'ngx-notification';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./inputs.component.scss'],
  templateUrl: './inputs.component.html',
})
export class vheadlineInputsComponent implements OnInit, AfterViewInit{
  
  formvheadline: FormGroup;
  
  
constructor(
  private router: Router,
  private formBuilder: FormBuilder,
  private _vheadlineService: vheadlineService,
  private ngxNotificationService: NgxNotificationService
){
}
  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    this.formvheadline = this.formBuilder.group({
      Id: [null, Validators.required],
      Title: [null, Validators.required],
      URL: [null, Validators.required],
      Description: [null, Validators.required],
      
      
    });
  }
  

  savevheadline() {
    console.log(this.formvheadline.value);
    if (this.formvheadline.valid) {
      this._vheadlineService.create(this.formvheadline.value).subscribe(res => {
        this.ngxNotificationService.sendMessage('Input vheadline data success.', 'success', 'bottom-right')
        setTimeout(() => {
          this.router.navigate(['pages/vheadline/list']);
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
      this.validateAllFormFields(this.formvheadline);
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
    return !this.formvheadline.get(field).valid && this.formvheadline.get(field).touched;
  }
}
