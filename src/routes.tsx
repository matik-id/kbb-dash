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
    name: 'Anggota',
    layout: '/admin',
    path: '/user',
    icon: FaUsers,
    parent: true,
  },
  {
    name: 'Aktif',
    layout: '/admin',
    path: '/user?status=active',
    secondary: true,
  },
  {
    name: 'Pending',
    layout: '/admin',
    path: '/user?status=pending',
    secondary: true,
  },
  {
    name: 'Baru',
    layout: '/admin',
    path: '/user?status=new',
    secondary: true,
  },
  {
    name: 'Blokir',
    layout: '/admin',
    path: '/user?status=block',
    secondary: true,
  },
  {
    name: 'Slideshow',
    layout: '/admin',
    path: '/slideshow',
    icon: RiSlideshow3Fill,
  },
  {
    name: 'Artikel',
    layout: '/admin',
    path: '/article',
    icon: MdArticle,
  },
  {
    name: 'Kegiatan',
    layout: '/admin',
    path: '/activity',
    icon: MdLocalActivity,
  },
  {
    name: 'Destinasi Wisata',
    layout: '/admin',
    path: '/destination',
    icon: FaUmbrellaBeach,
  },
  {
    name: 'Admin',
    layout: '/admin',
    path: '/operator',
    icon: FaUserCircle,
  },
];
