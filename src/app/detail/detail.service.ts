import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(
    private http: HttpClient,
  ) { }

  getPost(id: any) {
    return this.http.get('https://scrum-truco-7ae94-default-rtdb.firebaseio.com/teste-projects/' + id + '.json', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).toPromise();
  }

  createPost(post: any) {
    return this.http.post('https://scrum-truco-7ae94-default-rtdb.firebaseio.com/teste-projects.json', post, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).toPromise();
  }

  savePost(id: any, post: any) {
    return this.http.put('https://scrum-truco-7ae94-default-rtdb.firebaseio.com/teste-projects/' + id + '.json', post, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).toPromise();
  }
}