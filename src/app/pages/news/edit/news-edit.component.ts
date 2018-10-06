import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { NewsService } from '../../../_services/news.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxNotificationService } from 'ngx-notification';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-form-edit',
  styleUrls: ['./news-edit.component.scss'],
  templateUrl: './news-edit.component.html',
})
export class NewsEditComponent implements OnInit, AfterViewInit{
  
  formNews: FormGroup;
  
  newss:any[]=[];
  news:any;
  id: number;
  txtId:any;
  txtCategory:any;
  txtTitle:any;
  txtDate:any;
  txtURLPhoto:any;
  txtDescription:any;
constructor(
  private router: Router,
  private formBuilder: FormBuilder,
  private _newsService: NewsService,
  private ngxNotificationService: NgxNotificationService,
  private chRef: ChangeDetectorRef,
  private activatedRoute: ActivatedRoute,
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
    this.id = + this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    this.getList(this.id);

   
  }
  
  async getList(id: number) {
   // this.permit = await this._permitService.getPermit(id).toPromise();
    // console.log(this.permit);
    this.news = await this._newsService.getList(id).toPromise();
    
    // this.txtId=this.news.Id;
    // this.txtCategory=this.news.Category;
    // this.txtTitle=this.news.Title;
    // this.txtDate=this.news.Date;
    // this.txtURLPhoto=this.news.URLPhoto;
    // this.txtDescription=this.news.Description;
    
    this.formNews.get('Id').setValue(this.news.Id);
    this.formNews.get('Category').setValue(this.news.Category);
    this.formNews.get('Title').setValue(this.news.Title);
    this.formNews.get('Date').setValue(this.news.Date);
    this.formNews.get('URLPhoto').setValue(this.news.URLPhoto);
    this.formNews.get('Description').setValue(this.news.Description);


    // this._newsService.getList().subscribe(data => {
    //   this.news = data;
    //   var obj = JSON.parse( this.news);
    //   console.log(this.news);
    //   this.chRef.detectChanges();
    // },
    // (err: HttpErrorResponse) => {
    //   console.log("Get all data news error. Error code: ", err)
    //   // this._notificationsService.error(
    //   //   'Error',
    //   //   'Get all data bt error. Error code: ' + err
    //   // )
    // }),
    // () => console.log('Done loading all data news.');


  }
  updateNews() {
    console.log(this.news.Id);
    if (this.formNews.valid) {
      this._newsService.update(this.formNews.value,this.news.Id).subscribe(res => {
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
