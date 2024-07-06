import { IconType } from 'react-icons';
import {
  MdHome,
} from 'react-icons/md';
import { FaUmbrellaBeach } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { RiSlideshow3Fill } from "react-icons/ri";
import { MdLocalActivity } from "react-icons/md";


export interface IRoute {
  name: string;
  layout: string; 
  icon?: IconType;
  parent?: boolean;
  secondary?: boolean;
  path: string;
}

// Admin Routes
export const routes: Array<IRoute> = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/dashboard',
    icon: MdHome,
  },
  {
    name: 'Admin',
    layout: '/admin',
    path: '/operator',
    icon: FaUserCircle,
  },
  {
    name: 'Anggota',
    layout: '/admin',
    path: '/user',
    icon: FaUsers,
  },
  {
    name: 'Artikel',
    layout: '/admin',
    path: '/article',
    icon: MdArticle,
  },
  {
    name: 'Destinasi Wisata',
    layout: '/admin',
    path: '/destination',
    icon: FaUmbrellaBeach,
  },
  {
    name: 'Slideshow',
    layout: '/admin',
    path: '/slideshow',
    icon: RiSlideshow3Fill,
  },
  {
    name: 'Aktivitas',
    layout: '/admin',
    path: '/activity',
    icon: MdLocalActivity,
  },
];
