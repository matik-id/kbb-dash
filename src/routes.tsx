import { IconType } from 'react-icons';
import {
  MdHome,
  MdPeople,
} from 'react-icons/md';
import { FaBookBookmark, FaBookOpenReader, FaChalkboardUser, FaCircleDollarToSlot, FaDollarSign, FaFileShield, FaHandHoldingHand, FaHandshake, FaImages, FaMoneyBillTransfer, FaMoneyCheckDollar, FaNewspaper, FaUserTie } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";

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
    name: 'Pinjaman',
    layout: '/admin',
    path: '/loan',
    icon: FaMoneyBillTransfer,
  },
  {
    name: 'Hibah Terencana',
    layout: '/admin',
    path: '/grantPlanned',
    icon: FaMoneyCheckDollar,
  },
  {
    name: 'Hibah Langsung Uang',
    layout: '/admin',
    path: '/grantMoney',
    icon: GiMoneyStack,
  },
  {
    name: 'Hibah Langsung Barang/Jasa',
    layout: '/admin',
    path: '/grantItem',
    icon: FaHandshake,
  },
  {
    name: 'Ongranting',
    layout: '/admin',
    path: '/ongranting',
    icon: FaDollarSign,
  },
  {
    name: 'AWP Pinjaman',
    layout: '/admin',
    path: '/awp',
    icon: FaCircleDollarToSlot,
  },
  {
    name: 'Donor/Lender',
    layout: '/admin',
    path: '/donor',
    icon: FaHandHoldingHand,
  },
  {
    name: 'Regulasi',
    layout: '/admin',
    path: '/regulation',
    icon: FaBookBookmark,
  },
  {
    name: 'Pejabat',
    layout: '/admin',
    path: '/officer',
    icon: FaUserTie,
  },
  {
    name: 'Daftar Istilah',
    layout: '/admin',
    path: '/glossary',
    icon: FaBookOpenReader,
  },
  {
    name: 'Berita',
    layout: '/admin',
    path: '/post',
    icon: FaNewspaper,
  },
  {
    name: 'Publikasi',
    layout: '/admin',
    path: '/publication',
    icon: FaChalkboardUser,
  },
  {
    name: 'Kebijakan',
    layout: '/admin',
    path: '/policy',
    icon: FaFileShield,
  },
  {
    name: 'Pengguna',
    layout: '/admin',
    path: '/user',
    icon: MdPeople,
    parent: true,
  },
  {
    name: 'Pengguna Admin',
    layout: '/admin',
    path: '/user?role=admin',
    secondary: true,
  },
  {
    name: 'Pengguna KLN',
    layout: '/admin',
    path: '/user?role=kln',
    secondary: true,
  },
  {
    name: 'Pengguna ESELON',
    layout: '/admin',
    path: '/user?role=eselon',
    secondary: true,
  },
  {
    name: 'Pengguna SATKER',
    layout: '/admin',
    path: '/user?role=satker',
    secondary: true,
  },
];

export const klnRoutes: Array<IRoute> = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/dashboard',
    icon: MdHome,
  },
  {
    name: 'Pinjaman',
    layout: '/admin',
    path: '/loan',
    icon: FaMoneyBillTransfer,
  },
  {
    name: 'Hibah Terencana',
    layout: '/admin',
    path: '/grantPlanned',
    icon: FaMoneyCheckDollar,
  },
  {
    name: 'Hibah Langsung Uang',
    layout: '/admin',
    path: '/grantMoney',
    icon: GiMoneyStack,
  },
  {
    name: 'Hibah Langsung Barang/Jasa',
    layout: '/admin',
    path: '/grantItem',
    icon: FaHandshake,
  },
  {
    name: 'Ongranting',
    layout: '/admin',
    path: '/ongranting',
    icon: FaDollarSign,
  },
  {
    name: 'AWP Pinjaman',
    layout: '/admin',
    path: '/awp',
    icon: FaCircleDollarToSlot,
  },
  {
    name: 'Donor/Lender',
    layout: '/admin',
    path: '/donor',
    icon: FaHandHoldingHand,
  },
  {
    name: 'Regulasi',
    layout: '/admin',
    path: '/regulation',
    icon: FaBookBookmark,
  },
  {
    name: 'Pejabat',
    layout: '/admin',
    path: '/regulation',
    icon: FaUserTie,
  },
  {
    name: 'Dokumentasi',
    layout: '/admin',
    path: '/regulation',
    icon: FaImages,
  },
  {
    name: 'Daftar Istilah',
    layout: '/admin',
    path: '/regulation',
    icon: FaBookOpenReader,
  },
];

export const satkerRoutes: Array<IRoute> = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/dashboard',
    icon: MdHome,
  },
  {
    name: 'Pinjaman',
    layout: '/admin',
    path: '/loan',
    icon: FaMoneyBillTransfer,
  },
  {
    name: 'Hibah Terencana',
    layout: '/admin',
    path: '/grantPlanned',
    icon: FaMoneyCheckDollar,
  },
  {
    name: 'Hibah Langsung Uang',
    layout: '/admin',
    path: '/grantMoney',
    icon: GiMoneyStack,
  },
  {
    name: 'Hibah Langsung Barang/Jasa',
    layout: '/admin',
    path: '/grantItem',
    icon: FaHandshake,
  },
  {
    name: 'Ongranting',
    layout: '/admin',
    path: '/ongranting',
    icon: FaDollarSign,
  },
  {
    name: 'AWP Pinjaman',
    layout: '/admin',
    path: '/awp',
    icon: FaCircleDollarToSlot,
  }
];

export const eselonRoutes: Array<IRoute> = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/dashboard',
    icon: MdHome,
  },
  {
    name: 'Pinjaman',
    layout: '/admin',
    path: '/loan',
    icon: FaMoneyBillTransfer,
  },
  {
    name: 'Hibah Terencana',
    layout: '/admin',
    path: '/grantPlanned',
    icon: FaMoneyCheckDollar,
  },
  {
    name: 'Hibah Langsung Uang',
    layout: '/admin',
    path: '/grantMoney',
    icon: GiMoneyStack,
  },
  {
    name: 'Hibah Langsung Barang/Jasa',
    layout: '/admin',
    path: '/grantItem',
    icon: FaHandshake,
  },
  {
    name: 'Ongranting',
    layout: '/admin',
    path: '/ongranting',
    icon: FaDollarSign,
  },
  {
    name: 'AWP Pinjaman',
    layout: '/admin',
    path: '/awp',
    icon: FaCircleDollarToSlot,
  }
];
