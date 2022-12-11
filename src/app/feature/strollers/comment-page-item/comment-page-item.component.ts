import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/core/interfaces/comment';

@Component({
  selector: 'app-comment-page-item',
  templateUrl: './comment-page-item.component.html',
  styleUrls: ['./comment-page-item.component.css']
})
export class CommentPageItemComponent implements OnInit {

  @Input() comment!: IComment;

  constructor() { }

  ngOnInit(): void {
  }

}
