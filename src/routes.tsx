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
    name: 'Admin',
    layout: '/admin',
    path: '/admin',
    icon: FaMoneyBillTransfer,
  },

];
