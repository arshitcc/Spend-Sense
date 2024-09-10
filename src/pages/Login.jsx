import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
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
import { useNavigate } from "react-router-dom"
import useAuthStore from "@/app/mystore"
import authService from "@/appwrite/auth"

function Login() {

  const navigate = useNavigate();
  const authStatus = useAuthStore((state) => state.authStatus);
  useEffect(() => {
    if (authStatus) {
      navigate('/', { replace: true });
    }
  }, [authStatus, navigate]);

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setPassword] = useState('');
  const [error, setError] = useState("");
  const userLogin = useAuthStore((state) => state.userLogin);

  const handleLogin = async () => {

    if(
      [userEmail,userPassword].some((field) => field?.trim()===0)
    ){
      setError('!! Please Enter all the valid fields !!');
      return;
    }

    try {
      const userSession = await authService.userLogin({userEmail, userPassword});
      if(userSession){
        const user = await authService.getCurrentSession();
        if(user) userLogin(user);
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Card className="mx-auto max-w-sm my-8">
      <CardHeader>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your information below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              value={userPassword} 
              onChange={(e) => setPassword(e.target.value)}
              id="password" 
              type="password" 
              required 
            />
          </div>
          <Button
          onClick={handleLogin} 
          type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to='/signup' className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default Login;