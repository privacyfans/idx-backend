import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../../_services/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxNotificationService } from 'ngx-notification';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-form-view',
  styleUrls: ['./user-view.component.scss'],
  templateUrl: './user-view.component.html',
})
export class userViewComponent implements OnInit, AfterViewInit{
  
  formuser: FormGroup;
  
  users:any[]=[];
  user:any;
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
  private _userService: UserService,
  private ngxNotificationService: NgxNotificationService,
  private chRef: ChangeDetectorRef,
  private activatedRoute: ActivatedRoute,
){
}
  ngAfterViewInit(): void {
    //throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    this.formuser = this.formBuilder.group({
      Id: [null, Validators.required],
      Name: [null, Validators.required],
      Email: [null, Validators.required],
      is_Admin: [null, Validators.required],
      Password: [null, Validators.required],
      
      
    });
    this.id = + this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    this.getList(this.id);

   
  }
  
  async getList(id: number) {
   // this.permit = await this._permitService.getPermit(id).toPromise();
    // console.log(this.permit);
    this.user = await this._userService.getList(id).toPromise();
    
    // this.txtId=this.user.Id;
    // this.txtCategory=this.user.Category;
    // this.txtTitle=this.user.Title;
    // this.txtDate=this.user.Date;
    // this.txtURLPhoto=this.user.URLPhoto;
    // this.txtDescription=this.user.Description;
    
    this.formuser.get('Id').setValue(this.user.Id);
    this.formuser.get('Name').setValue(this.user.Name);
    this.formuser.get('Email').setValue(this.user.Email);
    this.formuser.get('is_Admin').setValue(this.user.is_Admin);
    this.formuser.get('Password').setValue(this.user.Password);
    console.log(this.user.Name);

    // this._userService.getList().subscribe(data => {
    //   this.user = data;
    //   var obj = JSON.parse( this.user);
    //   console.log(this.user);
    //   this.chRef.detectChanges();
    // },
    // (err: HttpErrorResponse) => {
    //   console.log("Get all data user error. Error code: ", err)
    //   // this._notificationsService.error(
    //   //   'Error',
    //   //   'Get all data bt error. Error code: ' + err
    //   // )
    // }),
    // () => console.log('Done loading all data user.');


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
    return !this.formuser.get(field).valid && this.formuser.get(field).touched;
  }
}
