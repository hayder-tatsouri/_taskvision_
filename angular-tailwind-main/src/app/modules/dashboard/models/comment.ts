export interface UserSummary {
  id: number;
  firstName?: string;
  lastName?: string;
  role?:string
}

export interface Comment {
  id : number
  content: string;
  commentDate: Date;
  taskId:number;
  userId: number;
  createdAt?:Date;
  updatedAt?:Date;

  user?: UserSummary;   


}