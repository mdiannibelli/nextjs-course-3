import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {IoCalendarOutline, IoCheckboxOutline, IoCodeWorking, IoGift, IoListOutline, IoPersonOutline} from 'react-icons/io5'
import SidebarItem from './SidebarItem'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Logout } from './Logout'


const menuItems = [
  {
    path: '/dashboard',
    icon: <IoCalendarOutline size={30}/>,
    name: 'Dashboard'
  },
  {
    path: '/dashboard/rest-todos',
    icon: <IoCheckboxOutline size={30}/>,
    name: 'Rest Todos'
  },
  {
    path: '/dashboard/server-todos',
    icon: <IoListOutline size={30}/>,
    name: 'Server Actions'
  },
  {
    path: '/dashboard/cookies',
    icon: <IoCodeWorking size={30}/>,
    name: 'Cookies'
  },
  {
    path: '/dashboard/productos',
    icon: <IoGift size={30}/>,
    name: 'Productos'
  },
  {
    path: '/dashboard/profile',
    icon: <IoPersonOutline/>,
    name: 'Profile'
  }
]


export default async function Sidebar() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.name ?? 'No Name';
  const userRole = session?.user?.roles ?? 'User';
  const avatarUrl = session?.user?.image ? session?.user.image : 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            <Link href='/dashboard' title="dashboard">
              <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" width={100} height={62}  alt="tailus logo"/>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Image src={avatarUrl} width={124} height={124} alt="" className="m-auto rounded-full object-cover"/>
              <h5 className="hidden mt-4 text-lg font-semibold text-gray-600 lg:block">{user}</h5>
              <span className="hidden text-gray-400 lg:block">{userRole}</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {menuItems.map((item) => (
              <SidebarItem path={item.path} icon={item.icon} name={item.name}/>
            ))}
            
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <Logout/>
        </div>
      </aside>
  )
}
