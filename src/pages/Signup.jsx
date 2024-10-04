import React, { useEffect, useState } from 'react'
import UserDetails from '@/components/signup/UserDetails'
import Verify from '@/components/signup/Verify'
import PersonalDetails from '@/components/signup/PersonalDetails'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Loader } from '@/components/Loader'
import useAuthStore from '@/app/mystore'

function Signup() {

  const navigate = useNavigate();
  const authStatus = useAuthStore((state) => state.authStatus);
  if(authStatus) navigate('/');
   
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const userId = searchParams.get('userId');
    const secret = searchParams.get('secret');
    if(userId && secret){
      setStep(2);
    }
  },[searchParams])

  const [step, setStep] = useState(1);
  const [userData, setUserData]= useState({
    userId : '',
    userFullName : '',
    userEmail : '',
    userPassword : '',
    userConfirmPassword : '',
    phone : '',
    expenses : '',
    salary : ''
  })

  const handleChange = (input) => (e) => {
    setUserData((prevData) => ({
      ...prevData,  
      [input]: e.target.value,
    }));
  };
  

  const nextStep = () => (setStep((prev) => prev+1));

  switch(step) {
    case 1 : 
      return (
        <UserDetails
        handleChange = {handleChange}
        nextStep = {nextStep}
        userData = {userData}
        />
      )
    case 2 : 
      return (
        <Verify
        setStep = {setStep}
        />
      )
    case 3 : 
      return (
        <PersonalDetails
        handleChange = {handleChange}
        nextStep = {nextStep}
        userData = {userData}
        />
      )

    default : 
      return (
        <Loader/>
      )
  }
}

export default Signup