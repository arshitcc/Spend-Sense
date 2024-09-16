import useAuthStore from '@/app/mystore'
import Profile from '@/components/Profile'
import TransactionList from '@/components/TransactionList'
import React from 'react'

function Home() {

  const authStatus = useAuthStore((state) => state.authStatus);

  return (
    <>
      <div>Home</div>
      {authStatus && <Profile/>}
      {authStatus && <TransactionList/>}
    </>
  )
}

export default Home