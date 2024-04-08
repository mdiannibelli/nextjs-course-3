'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import React from 'react'
import { CiLogout } from 'react-icons/ci'
import { IoLogIn, IoShieldOutline } from 'react-icons/io5';

export const Logout = () => {
    const {data: session, status} = useSession();
    //console.log({status})
    if(status === 'loading') {
        return (
            <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <IoShieldOutline />
            <span className="group-hover:text-gray-700">Cargando...</span>
          </button>
        )
    }

    if(status === 'unauthenticated') {
        return (
            <button
            //! SIGN IN
            onClick={() => signIn()}
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <IoLogIn />
            <span className="group-hover:text-gray-700">Ingresar</span>
          </button>
        )
    }
    
  return (
    <button
    //! SIGN OUT
    onClick={() => signOut()}
    className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <CiLogout />
            <span className="group-hover:text-gray-700">Logout</span>
          </button>
  )
}
