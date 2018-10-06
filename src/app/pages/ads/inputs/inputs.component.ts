import { Component, AfterViewInit, OnInit } from '@angular/core';
import { adsService } from '../../../_services/ads.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxNotificationService } from 'ngx-notification';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./inputs.component.scss'],
  templateUrl: './inputs.component.html',
})
export class adsInputsComponent implements OnInit, AfterViewInit{
  
  formads: FormGroup;
  
  
constructor(
  private router: Router,
  private formBuilder: FormBuilder,
  private _adsService: adsService,
  private ngxNotificationService: NgxNotificationService
){
}
  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    this.formads = this.formBuilder.group({
      Id: [null, Validators.required],
      Title: [null, Validators.required],
      URLPhoto: [null, Validators.required],
      Link: [null, Validators.required],
      
      
    });
  }
  

  saveads() {
    console.log(this.formads.value);
    if (this.formads.valid) {
      this._adsService.create(this.formads.value).subscribe(res => {
        this.ngxNotificationService.sendMessage('Input ads data success.', 'success', 'bottom-right')
        setTimeout(() => {
          this.router.navigate(['pages/ads/list']);
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
      this.validateAllFormFields(this.formads);
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
    return !this.formads.get(field).valid && this.formads.get(field).touched;
  }
}
