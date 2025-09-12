export interface UserSummary {
  id: number;
  firstName?: string;
  lastName?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  deadline: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  clientId: number;
  managerId: number;

  client?: UserSummary;   
  manager?: UserSummary;  
}
