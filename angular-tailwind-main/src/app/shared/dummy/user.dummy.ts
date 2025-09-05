import { User } from 'src/app/modules/uikit/pages/table/model/user.model';

export const dummyData: User[] = [
  {
    id: 1,
    firstName: 'John Doe',
    lastName: 'johndoe',
    email: 'john.doe@example.com',
    role: 'Software Engineer',
    selected: false,
    status: 1,
    createdAt: '2024-10-12T12:34:56Z',
  },
  
  {
    id: 5,
    firstName: 'David Johnson',
    lastName: 'davidj',
    email: 'david.johnson@example.com',
    role: 'Product Manager',
    selected: true,
    status: 1,
    createdAt: '2024-10-20T12:34:56Z',
  },
  
];
