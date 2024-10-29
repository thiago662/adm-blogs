import { Component } from '@angular/core';
import { DetailService } from './detail.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  id: any;
  post: any;
  htmlContent = '';
  postForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    html: new FormControl(''),
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

    if (this.id != 'add') {
      this.getPost(this.id);
    }
  }

  getPost(id: any) {
    this.detailService.getPost(id)
      .then((data: any) => {
        this.postForm.patchValue({
          id: data?.id ?? id,
          title: data?.title,
          html: data?.html,
        });
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {});
  }

  onSubmitToCreate() {
    if (this.id == 'add') {
      this.creatPost(this.postForm.value);
    } else {
      this.savePost(this.id, this.postForm.value);
    }
  }

  creatPost(post: any): void {
    this.detailService.createPost(post)
      .then((data: any) => {
        this.router.navigate(['/post/' + data?.name]);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {});
  }

  savePost(id: any, post: any): void {
    this.detailService.savePost(id, post)
      .then((data: any) => {
        this.router.navigate(['/post/' + id]);
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {});
  }
}
