import React, { useState } from 'react'
import { Link } from 'react-router-dom' 
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useAuthStore from '@/app/mystore'
import authService from '@/appwrite/auth'

function UserDetails({userData, nextStep, handleChange}) {

  const {userFullName, userEmail, userPassword, userConfirmPassword} = userData;
  const [error, setError] = useState("");
  const userLogin = useAuthStore((state) => state.userLogin);
  
  const handleSignup = async () => {
    
    setError('');    
    if(
      [userFullName, userEmail, userPassword, userConfirmPassword].some((field) => field?.trim() === '')
    ){
      setError('!! Please Enter all the field !!');
      return;
    }

    if(userPassword !== userConfirmPassword){
      setError(`Password didn't match`);
      return;
    }

    try {
      const user = await authService.createAccount({userFullName, userEmail, userPassword});
      if(user){
        await authService.userLogin({userEmail, userPassword});
        userLogin(user);
        const verification = await authService.createEmailVerify();
        nextStep();
      }
      return
    } 
    catch (error) {
      setError(error.message);
    }
  }
  

  return (
    <Card className="mx-auto max-w-sm my-8">
      <CardHeader>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="last-name">Full name *</Label>
              <Input 
                value={userFullName}
                onChange={handleChange('userFullName')}
                id="full-name" 
                placeholder="Robinson" 
                required 
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              value={userEmail}
              onChange={handleChange('userEmail')}
              id="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password *</Label>
            <Input 
                value = {userPassword}
                onChange = {handleChange('userPassword')}
                id="password" 
                type="password" 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm Password *</Label>
            <Input 
                value = {userConfirmPassword}
                onChange = {handleChange('userConfirmPassword')}
                id="confirm_password" 
                type="password" 
            />
          </div>
          <Button
            onClick={handleSignup}
            type="submit" 
            className="w-full"
          >
            Create an account
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to='/login' className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserDetails;