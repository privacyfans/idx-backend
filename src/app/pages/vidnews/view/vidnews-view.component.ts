import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { VidnewsService } from '../../../_services/vidnews.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxNotificationService } from 'ngx-notification';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-form-view',
  styleUrls: ['./vidnews-view.component.scss'],
  templateUrl: './vidnews-view.component.html',
})
export class vidnewsViewComponent implements OnInit, AfterViewInit{
  
  formvidnews: FormGroup;
  
  vidnewss:any[]=[];
  vidnews:any;
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
  private _vidnewsService: VidnewsService,
  private ngxNotificationService: NgxNotificationService,
  private chRef: ChangeDetectorRef,
  private activatedRoute: ActivatedRoute,
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
    this.id = + this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    this.getList(this.id);

   
  }
  
  async getList(id: number) {
   // this.permit = await this._permitService.getPermit(id).toPromise();
    // console.log(this.permit);
    this.vidnews = await this._vidnewsService.getList(id).toPromise();
    
    // this.txtId=this.vidnews.Id;
    // this.txtCategory=this.vidnews.Category;
    // this.txtTitle=this.vidnews.Title;
    // this.txtDate=this.vidnews.Date;
    // this.txtURLPhoto=this.vidnews.URLPhoto;
    // this.txtDescription=this.vidnews.Description;
    
    this.formvidnews.get('Id').setValue(this.vidnews.Id);
    this.formvidnews.get('Title').setValue(this.vidnews.Title);
    this.formvidnews.get('URLVideo').setValue(this.vidnews.URLVideo);
    

    // this._vidnewsService.getList().subscribe(data => {
    //   this.vidnews = data;
    //   var obj = JSON.parse( this.vidnews);
    //   console.log(this.vidnews);
    //   this.chRef.detectChanges();
    // },
    // (err: HttpErrorResponse) => {
    //   console.log("Get all data vidnews error. Error code: ", err)
    //   // this._notificationsService.error(
    //   //   'Error',
    //   //   'Get all data bt error. Error code: ' + err
    //   // )
    // }),
    // () => console.log('Done loading all data vidnews.');


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
