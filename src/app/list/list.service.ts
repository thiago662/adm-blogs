import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from '../general/general.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private http: HttpClient,
    private generalService: GeneralService,
  ) { }

  getPosts(blog: any) {
    return this.http.get(this.generalService.getBlogUrl(blog) + '/teste-projects.json', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).toPromise();
  }

  createPost(blog: any, post: any) {
    return this.http.post(this.generalService.getBlogUrl(blog) + '/teste-projects.json', post, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).toPromise();
  }
}
