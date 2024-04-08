'use client'
import Link from 'next/link'
import React from 'react'
import { CiBookmarkCheck } from 'react-icons/ci'
import { usePathname } from 'next/navigation'

interface Props {
  path: string;
  icon: React.ReactNode;
  name: string;
}

export default function SidebarItem({path, icon, name} : Props) {
  const pathName = usePathname()
  return (
    <>
        <li>
            <Link href={path} className={`${(path === pathName) ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : 'text-white bg-gradient-to-r from-sky-300 to-cyan-200'} relative px-4 py-3 flex items-center space-x-4 rounded-xl`}>
                {icon}
              <span className="-mr-1 font-medium">{name}</span>
            </Link>
        </li>
    </>
  )
}
