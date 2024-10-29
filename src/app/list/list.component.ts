import { Component } from '@angular/core';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  lists: any;

  constructor(
    private listService: ListService,
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    this.listService.getPosts()
      .then((data: any) => {
        var resultArray = Object.keys(data).map(function(personNamedIndex){
          let person = data[personNamedIndex];
          person.id = personNamedIndex;
          // do something with person
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
}
