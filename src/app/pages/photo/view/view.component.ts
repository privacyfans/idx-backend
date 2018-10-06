import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { photoService } from '../../../_services/photo.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxNotificationService } from 'ngx-notification';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-form-view',
  styleUrls: ['./view.component.scss'],
  templateUrl: './view.component.html',
})
export class photoViewComponent implements OnInit, AfterViewInit{
  
  formphoto: FormGroup;
  
  photos:any[]=[];
  photo:any;
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
  private _photoService: photoService,
  private ngxNotificationService: NgxNotificationService,
  private chRef: ChangeDetectorRef,
  private activatedRoute: ActivatedRoute,
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
    this.id = + this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    this.getList(this.id);

   
  }
  
  async getList(id: number) {
   // this.permit = await this._permitService.getPermit(id).toPromise();
    // console.log(this.permit);
    this.photo = await this._photoService.getList(id).toPromise();
    
    // this.txtId=this.photo.Id;
    // this.txtCategory=this.photo.Category;
    // this.txtTitle=this.photo.Title;
    // this.txtDate=this.photo.Date;
    // this.txtURLPhoto=this.photo.URLPhoto;
    // this.txtDescription=this.photo.Description;
    
    this.formphoto.get('Id').setValue(this.photo.Id);
    this.formphoto.get('Title').setValue(this.photo.Title);
    this.formphoto.get('URLPhoto').setValue(this.photo.URLPhoto);
    
    

    // this._photoService.getList().subscribe(data => {
    //   this.photo = data;
    //   var obj = JSON.parse( this.photo);
    //   console.log(this.photo);
    //   this.chRef.detectChanges();
    // },
    // (err: HttpErrorResponse) => {
    //   console.log("Get all data photo error. Error code: ", err)
    //   // this._notificationsService.error(
    //   //   'Error',
    //   //   'Get all data bt error. Error code: ' + err
    //   // )
    // }),
    // () => console.log('Done loading all data photo.');


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
