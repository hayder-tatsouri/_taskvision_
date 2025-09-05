export interface User {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  role: string;
  selected?: boolean;
  status?: number;
  createdAt: string;
  password?: string;
}
