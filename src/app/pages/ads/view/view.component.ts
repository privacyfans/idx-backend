import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { adsService } from '../../../_services/ads.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxNotificationService } from 'ngx-notification';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-form-view',
  styleUrls: ['./view.component.scss'],
  templateUrl: './view.component.html',
})
export class adsViewComponent implements OnInit, AfterViewInit{
  
  formads: FormGroup;
  
  adss:any[]=[];
  ads:any;
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
  private _adsService: adsService,
  private ngxNotificationService: NgxNotificationService,
  private chRef: ChangeDetectorRef,
  private activatedRoute: ActivatedRoute,
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
    this.id = + this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    this.getList(this.id);

   
  }
  
  async getList(id: number) {
   // this.permit = await this._permitService.getPermit(id).toPromise();
    // console.log(this.permit);
    this.ads = await this._adsService.getList(id).toPromise();
    
    // this.txtId=this.ads.Id;
    // this.txtCategory=this.ads.Category;
    // this.txtTitle=this.ads.Title;
    // this.txtDate=this.ads.Date;
    // this.txtURLPhoto=this.ads.URLPhoto;
    // this.txtDescription=this.ads.Description;
    
    this.formads.get('Id').setValue(this.ads.Id);
    this.formads.get('Title').setValue(this.ads.Title);
    this.formads.get('URLPhoto').setValue(this.ads.URLPhoto);
    this.formads.get('Link').setValue(this.ads.Link);
    

    // this._adsService.getList().subscribe(data => {
    //   this.ads = data;
    //   var obj = JSON.parse( this.ads);
    //   console.log(this.ads);
    //   this.chRef.detectChanges();
    // },
    // (err: HttpErrorResponse) => {
    //   console.log("Get all data ads error. Error code: ", err)
    //   // this._notificationsService.error(
    //   //   'Error',
    //   //   'Get all data bt error. Error code: ' + err
    //   // )
    // }),
    // () => console.log('Done loading all data ads.');


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
