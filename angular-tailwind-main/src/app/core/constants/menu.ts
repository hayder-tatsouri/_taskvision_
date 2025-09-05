import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'gestion des projets',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/view-grid.svg',
          label: 'tableau de bord',
          route: '/dashboard/projects',
          
        },
        
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'projets',
          route: '/dashboard',
          children: [],
        },
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'tâches',
          route: '/dashboard',
          children: [],
        },
       /* {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Auth',
          route: '/auth',
          children: [
            { label: 'Sign up', route: '/sign-up' },
            { label: 'Sign in', route: '/sign-in' },
            { label: 'Forgot Password', route: '/forgot-password' },
            { label: 'New Password', route: '/new-password' },
            { label: 'Two Steps', route: '/two-steps' },
          ],
        },
        
          icon: 'assets/icons/heroicons/outline/exclamation-triangle.svg',
          label: 'Errors',
          route: '/errors',
          children: [
            { label: '404', route: '/errors/404' },
            { label: '500', route: '/errors/500' },
          ],
        },
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'Components',
          route: '/components',
          children: [{ label: 'Table', route: '/components/users' }],
        },*/
      ],
    },
    /*{
      group: '',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Download',
          route: '/download',
        },
        {
          icon: 'assets/icons/heroicons/outline/gift.svg',
          label: 'Gift Card',
          route: '/gift',
        },
        
      ],
    },*/
    {
      group: 'Admin',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/users.svg',
          label: 'utilisateurs',
          route: '/dashboard/components/users',
        },
        {
          icon: 'assets/icons/heroicons/outline/cube.svg',
          label: 'tous les projets',
          route: '/dashboard/components/allProjects',
        },
        /*{
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Notifications',
          route: '/gift',
        },
        {
          icon: 'assets/icons/heroicons/outline/folder.svg',
          label: 'Folders',
          route: '/folders',
          children: [
            { label: 'Current Files', route: '/folders/current-files' },
            { label: 'Downloads', route: '/folders/download' },
            { label: 'Trash', route: '/folders/trash' },
          ],
        },*/
      ],
    },
  ];
}
