import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../models/comment';
import { CommentService } from 'src/app/core/services/comment.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CommentComponent  {
  taskId!: number;
  newComment = '';
  comments: Comment[] = [];

  editCommentId: number | null = null;
  editContent = '';
    constructor(private commentService: CommentService, private route:ActivatedRoute) {}

   ngOnInit(): void {
     this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Task ID:", this.taskId);
    this.loadComments();
  }

  loadComments() {
    this.commentService.getCommentsForTask(this.taskId).subscribe({
      next: (data) => (this.comments = data),
      error: (err) => console.error('❌ Erreur chargement commentaires:', err),
    });
  }
  addComment() {
    if (!this.newComment.trim()) return;

    this.commentService.addComment(this.taskId, this.newComment).subscribe({
      next: (comment) => {
        this.comments.push(comment);
        this.newComment = '';
        this.loadComments();
      },
      error: (err) => console.error('❌ Erreur ajout commentaire:', err),
    });
  }

  

  startEdit(comment: Comment) {
    this.editCommentId = comment.id;
    this.editContent = comment.content;
  }

  saveEdit(comment: Comment) {
    comment.content = this.editContent;
    this.editCommentId = null;
    this.editContent = '';
  }

  cancelEdit() {
    this.editCommentId = null;
    this.editContent = '';
  }
}
