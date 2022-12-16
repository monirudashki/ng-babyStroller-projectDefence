import { Component, OnChanges, OnInit, SimpleChanges, ɵpublishDefaultGlobalUtils } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { CommentService } from 'src/app/core/comment.service';
import { IBabyStroller } from 'src/app/core/interfaces';
import { IComment } from 'src/app/core/interfaces/comment';
import { StrollersService } from 'src/app/core/strollers.service';

@Component({
  selector: 'app-catalog-details-page',
  templateUrl: './catalog-details-page.component.html',
  styleUrls: ['./catalog-details-page.component.css']
})
export class CatalogDetailsPageComponent implements OnInit {

  title: string = 'Details Page';

  stroller!: IBabyStroller;
  isLogged$: Observable<boolean> = this.authService.isLogged$;
  userId: string = '';
  isOwner: boolean = false;
  canLike: boolean = false;
  commentsList!: IComment[];

  commentFormGroup: FormGroup = this.formBuilder.group({
    postText: new FormControl("" , [Validators.required])
  })

  constructor(
    private authService: AuthService , 
    private activateRoute: ActivatedRoute,
    private strollersService: StrollersService,
    private commentService: CommentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    const strollerId = this.activateRoute.snapshot.params['id'];
    this.authService.currentUser$.subscribe(user => {
      if(user) {
        this.userId = user._id
      }
    });
    
    this.strollersService.loadStrollerById$(strollerId).subscribe(stroller => {
      const ownerId = stroller.userId.toString();

      if(!stroller.likes.includes(this.userId)) {
         this.canLike = true;
      }

      if(this.userId == ownerId) {
        this.isOwner = true;
      }
      this.stroller = stroller;
      this.commentsList = stroller.comments;
    });
  }

  deleteStrollerHandle(): void {
    const strollerId = this.activateRoute.snapshot.params['id'];

    this.strollersService.deleteStroller$(strollerId).subscribe({
      next: () => this.router.navigate(['/strollers']),
      complete: () => console.log('complete delete stroller'),
      error: (err) => {
        console.error(err);
      }
   });
  }

  likeHandler(): void {
    const strollerId = this.activateRoute.snapshot.params['id'];

    this.strollersService.likeStroller$(strollerId).subscribe({
      next: (stroller) => {
        this.stroller = stroller;
        this.canLike = false;
        this.router.navigate([`/strollers/${strollerId}`])
      },
      complete: () => console.log('complete like stroller'),
      error: (err) => {
        console.error(err);
      }
    })
  }

  unLikeHandler(): void {
    const strollerId = this.activateRoute.snapshot.params['id'];

    this.strollersService.unlikeStroller$(strollerId).subscribe({
      next: (stroller) => {
        this.stroller = stroller;
        this.canLike = true;
        this.router.navigate([`/strollers/${strollerId}`])
      },
      complete: () => console.log('complete unlike stroller'),
      error: (err) => {
        console.error(err);
      }
    })
  }
 
  postHandler(): void {
    const strollerId = this.activateRoute.snapshot.params['id'];
    //this.errorMessage = '';
    this.commentService.createComment$(this.commentFormGroup.value , strollerId).subscribe({
      next: (comment) => {
        this.commentsList.push(comment);
        this.commentFormGroup.reset();
      },
      complete: () => {
        console.log('Comment create')
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
