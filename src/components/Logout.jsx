import React from 'react'
import { Button } from './ui/button'
import authService from '@/appwrite/auth';
import useAuthStore from '@/app/mystore';
import { useNavigate } from 'react-router-dom';

function Logout() {
    
  const navigate = useNavigate();
  const userLogout = useAuthStore((state) => state.userLogout);

  const handleLogout = async () => {
    const isLoggedOut = await authService.userLogOut();
  
    if (isLoggedOut) {
        userLogout();
        navigate('/');
    } else {
        console.log('Logout failed. Please try again.');
    }
  }

  return (
    <Button
      onClick={handleLogout}
      variant="outline"  // shadcn/ui button variant
      className="flex items-center space-x-2"
    >
      <span>Logout</span>
    </Button>
  )
}

export default Logout;