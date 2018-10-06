import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'ion-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'News',
    icon: 'ion-wifi',
    children: [
      {
        title: 'List',
        link: '/pages/news/list',
      },
      {
        title: 'Add',
        link: '/pages/news/inputs',
      },
    ],
  },

  {
    title: 'Video News',
    icon: 'ion-play',
    children: [
      {
        title: 'List',
        link: '/pages/vidnews/list',
      },
      {
        title: 'Add',
        link: '/pages/vidnews/inputs',
      },
    ],
  },

  {
    title: 'Headline Video News',
    icon: 'ion-pricetags',
    children: [
      {
        title: 'List',
        link: '/pages/vheadline/list',
      },
      {
        title: 'Add',
        link: '/pages/vheadline/inputs',
      },
    ],
  },

  {
    title: 'Ads',
    icon: 'ion-easel',
    children: [
      {
        title: 'List',
        link: '/pages/ads/list',
      },
      {
        title: 'Add',
        link: '/pages/ads/inputs',
      },
    ],
  },
  {
    title: 'Photos',
    icon: 'ion-images',
    children: [
      {
        title: 'List',
        link: '/pages/photo/list',
      },
      {
        title: 'Add',
        link: '/pages/photo/inputs',
      },
    ],
  },

  // {
  //   title: 'Forms',
  //   icon: 'nb-compose',
  //   children: [
  //     {
  //       title: 'Form Inputs',
  //       link: '/pages/forms/inputs',
  //     },
  //     {
  //       title: 'Form Layouts',
  //       link: '/pages/forms/layouts',
  //     },
  //   ],
  // },
  {
    title: 'User',
    icon: 'ion-person',
    children: [
      {
        title: 'List',
        link: '/pages/user/list',
      },
      {
        title: 'Add',
        link: '/pages/user/inputs',
      },
    ],
  },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  // {
  //   title: 'Auth',
  //   icon: 'nb-locked',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
