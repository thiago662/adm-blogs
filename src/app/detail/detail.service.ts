import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(
    private http: HttpClient,
    private generalService: GeneralService,
  ) { }

  getPost(blog: any, id: any) {
    return this.http.get(this.generalService.getBlogUrl(blog) + '/teste-projects/' + id + '.json', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).toPromise();
  }

  savePost(blog: any, id: any, post: any) {
    return this.http.put(this.generalService.getBlogUrl(blog) + '/teste-projects/' + id + '.json', post, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).toPromise();
  }
}
