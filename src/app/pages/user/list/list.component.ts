import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

declare var jquery: any;
declare var $: any;
import Swal from 'sweetalert2';
import { User } from '../../../_models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../_services/user.service';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit,OnDestroy  {
 

  // bts: Bt[] = [];
  // bt: Bt;
  // bt_lns: Bt_LN[] = [];
  // bt_ln: Bt_LN;
  users:any[]=[];
  user:any;
  tData: boolean = false;
  // bsModalRef: BsModalRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private _script: ScriptLoaderService,
    private _userService: UserService,
    private chRef: ChangeDetectorRef,
    // private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.getAllList();
        // this.getAllList_ln();

    // this._permitService.getAllList()
    //   .subscribe((res: Permit[]) => {
    //     this.permits = res;
    //     this.chRef.detectChanges();
    //     // console.log(res);
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log("Get all data permit error. Error code: ", err)
    //   }),
    //   () => console.log('Done loading all data sanctions.');
  }

  // getAllData() {
      
  // }

  async getAllList() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this._userService.getAllList().subscribe(data => {
      this.user = data;
      this.dtTrigger.next();
      console.log(this.user);
      this.chRef.detectChanges();
    },
    (err: HttpErrorResponse) => {
      console.log("Get all data user error. Error code: ", err)
      // this._notificationsService.error(
      //   'Error',
      //   'Get all data bt error. Error code: ' + err
      // )
    }),
    () => console.log('Done loading all data user.');


  }

  

  ngAfterViewInit(): void {
    //  this._script.loadScripts('body',
    //    [
    // //     // 'assets/js/waves.js',
    // //     // 'assets/modules/sticky-kit-master/sticky-kit.min.js',
    // //     // 'assets/modules/jquery-sparkline/jquery.sparkline.min.js',
    //      'assets/modules/datatables/jquery.dataTables.min.js',
    //      'assets/modules/datatables/dataTables.buttons.min.js',
    // //     // 'assets/modules/datatables/buttons.flash.min.js',
    // //     // 'assets/modules/datatables/jszip.min.js',
    // //     // 'assets/modules/datatables/pdfmake.min.js',
    // //     // 'assets/modules/datatables/vfs_fonts.js',
    // //     // 'assets/modules/datatables/buttons.html5.min.js',
    // //     // 'assets/modules/datatables/buttons.print.min.js',
    //      'assets/modules/sweetalert/sweetalert2.all.min.js'
    //    ]); 

    // $('#listuser').DataTable({
    //   // dom: 'Bfrtip',
    //   // buttons: [
    //   //   'copy', 'csv', 'excel', 'pdf', 'print'
    //   // ]
    // });
  }
  fetchTableData(){
    this.tData = true;
    
   }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  deleteConfirm(obj) {
    Swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",   
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this._userService.delete(obj.Id)
          .subscribe(res => {
            this.users.splice(this.users.indexOf(obj), 1);
            this.dtTrigger.unsubscribe();
            this.getAllList();
            Swal(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )
          }, (error) => {
            Swal(
              'Error',
              error,
              'error'
            )
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

}
