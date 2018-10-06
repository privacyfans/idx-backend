import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { vheadlineService } from '../../../_services/vheadline.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxNotificationService } from 'ngx-notification';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-form-view',
  styleUrls: ['./view.component.scss'],
  templateUrl: './view.component.html',
})
export class vheadlineViewComponent implements OnInit, AfterViewInit{
  
  formvheadline: FormGroup;
  
  vheadlines:any[]=[];
  vheadline:any;
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
  private _vheadlineService: vheadlineService,
  private ngxNotificationService: NgxNotificationService,
  private chRef: ChangeDetectorRef,
  private activatedRoute: ActivatedRoute,
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
    this.id = + this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    this.getList(this.id);

   
  }
  
  async getList(id: number) {
   // this.permit = await this._permitService.getPermit(id).toPromise();
    // console.log(this.permit);
    this.vheadline = await this._vheadlineService.getList(id).toPromise();
    
    // this.txtId=this.vheadline.Id;
    // this.txtCategory=this.vheadline.Category;
    // this.txtTitle=this.vheadline.Title;
    // this.txtDate=this.vheadline.Date;
    // this.txtURLPhoto=this.vheadline.URLPhoto;
    // this.txtDescription=this.vheadline.Description;
    
    this.formvheadline.get('Id').setValue(this.vheadline.Id);
    this.formvheadline.get('Title').setValue(this.vheadline.Title);
    this.formvheadline.get('URL').setValue(this.vheadline.URL);
    this.formvheadline.get('Description').setValue(this.vheadline.Description);
    

    // this._vheadlineService.getList().subscribe(data => {
    //   this.vheadline = data;
    //   var obj = JSON.parse( this.vheadline);
    //   console.log(this.vheadline);
    //   this.chRef.detectChanges();
    // },
    // (err: HttpErrorResponse) => {
    //   console.log("Get all data vheadline error. Error code: ", err)
    //   // this._notificationsService.error(
    //   //   'Error',
    //   //   'Get all data bt error. Error code: ' + err
    //   // )
    // }),
    // () => console.log('Done loading all data vheadline.');


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
