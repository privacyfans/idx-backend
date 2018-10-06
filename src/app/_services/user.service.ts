import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
//,{responseType: 'text' as 'json'}
private httpOption = {
    headers: new HttpHeaders({
      'Accept': 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': localStorage.getItem('currentUser'),
    }),
    responseType: 'text'
  };
    // create(Id: number, Category: string, Title: string, Date: string, URLPhoto: string, Description: string) {
    //     return this.http.post(`${environment.apiUrl}/news`, { Id: Id, Category: Category,Title:Title,Date:Date,URLPhoto:URLPhoto,Description:Description },{responseType: 'text'})
    //         .pipe(map(res => {
               
    //              if (res) {
    //                 console.log("Create News Success");
    //             }else{
    //                 console.log("Create News Error");
    //             }
                
    //             return res;
                
    //         }));
    // }
    create(news) {
        return this.http.post(`${environment.apiUrl}/signup`, news)
            .pipe(map(res => {
               
                 if (res) {
                    console.log("Create News Success");
                }else{
                    console.log("Create News Error");
                }
                
                return res;
                
            }));
    }

    update(news,id: number) {
        return this.http.put(`${environment.apiUrl}/user/`+id, news)
            .pipe(map(res => {
               
                 if (res) {
                    console.log("Create User News Success");
                }else{
                    console.log("Create User News Error");
                }
                
                return res;
                
            }));
    }

    getAllList():Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/user`);
      }
      delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/user/` + id);
      }

      getList(id: number):Observable<any[]> {
        return this.http.get<any[]>(`${environment.apiUrl}/user/`+id);
      }
    
      

}