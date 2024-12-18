import { Component } from '@angular/core';
import { ListService } from './list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  blog: any;
  lists: any;
  postForm = new FormGroup({
    title: new FormControl(''),
    active: new FormControl(false),
    created_by: new FormControl(''),
    created_at: new FormControl(new Date().toISOString()),
    updated_at: new FormControl(new Date().toISOString()),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listService: ListService,
  ) { }

  ngOnInit(): void {
    this.blog = this.route.snapshot.routeConfig?.path;

    this.getPost(this.blog);
  }

  getPost(blog: any) {
    this.listService.getPosts(blog)
      .then((data: any) => {
        var resultArray = Object.keys(data).map(function(personNamedIndex){
          let person = data[personNamedIndex];
          person.id = personNamedIndex;

          return person;
        });

        this.lists = resultArray;
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  onSubmitToCreate() {
    this.createPost(this.blog, this.postForm.value);
  }

  createPost(blog: any, post: any): void {
    this.listService.createPost(blog, post)
      .then((data: any) => {
        this.router.navigate(['/' + blog + '/' + data?.name]);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {});
  }
}
