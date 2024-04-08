import { TabBar } from '@/components/TabBar'
import { cookies } from 'next/headers'
import React from 'react'

export const metadata = {
    title: 'Cookies Page',
    description: 'Page of cookies'
}

export default function CookiesPage() {
    const cookieStore = cookies();
    const cookieTab = cookieStore.get('selectedTab')?.value ?? '1' //! 'value' | null => al entrar por primera vez a la pagina son nulas entonces le ponemos que sea 1

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        <div className='flex flex-col'>
            <span className='text-3xl'>Tabs</span>
            <TabBar currentTab={Number(cookieTab)}/>
        </div>

    </div>
  )
}
