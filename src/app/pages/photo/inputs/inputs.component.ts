import { Component, AfterViewInit, OnInit } from '@angular/core';
import { photoService } from '../../../_services/photo.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxNotificationService } from 'ngx-notification';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./inputs.component.scss'],
  templateUrl: './inputs.component.html',
})
export class photoInputsComponent implements OnInit, AfterViewInit{
  
  formphoto: FormGroup;
  
  
constructor(
  private router: Router,
  private formBuilder: FormBuilder,
  private _photoService: photoService,
  private ngxNotificationService: NgxNotificationService
){
}
  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    this.formphoto = this.formBuilder.group({
      Id: [null, Validators.required],
      Title: [null, Validators.required],
      URLPhoto: [null, Validators.required],
      
      
      
    });
  }
  

  savephoto() {
    console.log(this.formphoto.value);
    if (this.formphoto.valid) {
      this._photoService.create(this.formphoto.value).subscribe(res => {
        this.ngxNotificationService.sendMessage('Input photo data success.', 'success', 'bottom-right')
        setTimeout(() => {
          this.router.navigate(['pages/photo/list']);
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
      this.validateAllFormFields(this.formphoto);
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
    return !this.formphoto.get(field).valid && this.formphoto.get(field).touched;
  }
}
