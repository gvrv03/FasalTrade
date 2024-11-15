import dynamic from 'next/dynamic';
import React from 'react'

const LandingPage = dynamic(() => import('@/components/Home/LandingPage'));

const HomePage = () => {
  return (
    <>
        <LandingPage/>
        
    </>
  )
}

export default HomePage