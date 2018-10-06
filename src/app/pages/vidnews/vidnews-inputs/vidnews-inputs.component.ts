import { Component, AfterViewInit, OnInit } from '@angular/core';
import { VidnewsService } from '../../../_services/vidnews.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxNotificationService } from 'ngx-notification';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./vidnews-inputs.component.scss'],
  templateUrl: './vidnews-inputs.component.html',
})
export class VidnewsInputsComponent implements OnInit, AfterViewInit{
  
  formvidnews: FormGroup;
  
  
constructor(
  private router: Router,
  private formBuilder: FormBuilder,
  private _vidnewsService: VidnewsService,
  private ngxNotificationService: NgxNotificationService
){
}
  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    this.formvidnews = this.formBuilder.group({
      Id: [null, Validators.required],
      Title: [null, Validators.required],
      URLVideo: [null, Validators.required],
      
      
    });
  }
  

  savevidnews() {
    console.log(this.formvidnews.value);
    if (this.formvidnews.valid) {
      this._vidnewsService.create(this.formvidnews.value).subscribe(res => {
        this.ngxNotificationService.sendMessage('Input vidnews data success.', 'success', 'bottom-right')
        setTimeout(() => {
          this.router.navigate(['pages/vidnews/list']);
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
      this.validateAllFormFields(this.formvidnews);
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
    return !this.formvidnews.get(field).valid && this.formvidnews.get(field).touched;
  }
}
