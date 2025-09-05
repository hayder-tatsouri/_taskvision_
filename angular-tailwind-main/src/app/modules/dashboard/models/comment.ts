export interface Comment {
  id : number
  content: string;
  commentDate: Date;
  taskId:number;
  userId: number;
  createdAt?:Date;
  updatedAt?:Date;

}