import { Component, AfterViewInit, OnInit } from '@angular/core';
import { NewsService } from '../../../_services/news.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxNotificationService } from 'ngx-notification';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./news-inputs.component.scss'],
  templateUrl: './news-inputs.component.html',
})
export class NewsInputsComponent implements OnInit, AfterViewInit{
  
  formNews: FormGroup;
  
  
constructor(
  private router: Router,
  private formBuilder: FormBuilder,
  private _newsService: NewsService,
  private ngxNotificationService: NgxNotificationService
){
}
  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    this.formNews = this.formBuilder.group({
      Id: [null, Validators.required],
      Category: [null, Validators.required],
      Title: [null, Validators.required],
      Date: [null, Validators.required],
      URLPhoto: [null, Validators.required],
      Description: [null, Validators.required],
      
    });
  }
  

  saveNews() {
    console.log(this.formNews.value);
    if (this.formNews.valid) {
      this._newsService.create(this.formNews.value).subscribe(res => {
        this.ngxNotificationService.sendMessage('Input news data success.', 'success', 'bottom-right')
        setTimeout(() => {
          this.router.navigate(['pages/news/list']);
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
      this.validateAllFormFields(this.formNews);
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
    return !this.formNews.get(field).valid && this.formNews.get(field).touched;
  }
}
