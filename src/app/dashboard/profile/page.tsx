'use client';
import { useSession } from 'next-auth/react';
import React from 'react'

export default function ProfilePage() {
    const {data: session} = useSession();
  return (
    <div>
        <h1>Profile Page</h1>
        <hr />
        <div className='flex flex-col'>
            <span>Full Name: {session?.user?.name ?? 'No Name'}</span>
            <span>Email: {session?.user?.email ?? 'No Email'}</span>
            <span>Img: {session?.user?.image ?? 'No Image'}</span>
            <span>Id: {session?.user?.id ?? 'No ID'}</span>
            <span>Roles: {session?.user?.roles ?? 'No Roles'}</span>
        </div>
    </div>
  )
}
