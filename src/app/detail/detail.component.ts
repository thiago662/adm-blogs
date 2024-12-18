import { Component } from '@angular/core';
import { DetailService } from './detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  id: any;
  blog: any;
  post: any;
  htmlContent = '';
  postForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    subtitle: new FormControl(''),
    active: new FormControl(''),
    created_by: new FormControl(''),
    html: new FormControl(''),
    created_at: new FormControl(''),
    updated_at: new FormControl(''),
    deleted_at: new FormControl(''),
  });

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private detailService: DetailService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.blog = this.route.snapshot.url[0].path;

    this.getPost(this.blog, this.id);
  }

  getPost(blog: any, id: any) {
    this.detailService.getPost(blog, id)
      .then((data: any) => {
        this.postForm.patchValue({
          id: data?.id ?? id,
          title: data?.title,
          subtitle: data?.subtitle,
          active: data?.active,
          created_by: data?.created_by,
          html: data?.html,
          created_at: data?.created_at,
          updated_at: data?.updated_at,
          deleted_at: data?.deleted_at,
        });
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {});
  }

  onSubmitToUpdate() {
    this.savePost(this.blog, this.id, this.postForm.value);
  }

  savePost(blog: any, id: any, post: any): void {
    post.updated_at = new Date().toISOString();

    this.detailService.savePost(blog, id, post)
      .then((data: any) => {
        this.ngOnInit();
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {});
  }
}
