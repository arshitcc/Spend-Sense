import React, { useState, useEffect } from 'react'
import useAuthStore from '@/app/mystore'
import authService from '@/appwrite/auth';
import { useSearchParams } from 'react-router-dom';


function Verify({setStep}) {

  const user = useAuthStore((state) => state.user);
  const userLogin = useAuthStore((state) => state.userLogin);
  const [response, setResponse] = useState(null);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    if(userId && secret){
      verifyUser(userId, secret)
    }
  },[searchParams])

  const verifyUser = async(userId, secret) => {
    try {
      const token = await authService.verifyEmail({userId, secret});
      if(token){
        setResponse(`User Verified`);     
        const verifiedUser = await authService.getCurrentSession();
        userLogin(verifiedUser);
        setStep(3);
      }
      
    } catch (error) {
      setResponse(`Unable to Verify User`);
      console.error(error);
    }
  }
  return (
    <div>
      {response || `Click on the link sent to your Registered email ID : ${user?.email || 'xxx@gmail.com'}`}
    </div>
  )
}

export default Verify