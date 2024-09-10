import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'
import user from '@/appwrite/users'
import useAuthStore from '@/app/mystore'

function PersonalDetails({userData, handleChange}) {

  const {phone, salary, expenses} = userData;
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  const myUser = useAuthStore((state) => state.user);

  const handlePersonalData = async () => {

    if(
      [phone, salary, expenses].some((field) => field?.trim() === '')
    ){
      setError('!! Please Enter all the valid fields !!');
      return;
    }

    const phonePattern= /^(\+?\d{1,3})?\d{10}$/;
    if (!phonePattern.test(phone)) {
      setError('!! Invalid phone number. !!');
      return;
    }

    const numberPattern = /^\d+$/;
    if (!numberPattern.test(salary) || !numberPattern.test(expenses)) {
      setError('!! Invalid Salary or Expense entered');
      return;
    }

    const newsalary = parseInt(salary);
    const newexpenses = parseInt(expenses);
  
    if (isNaN(newsalary) || isNaN(newexpenses) || newsalary < 0 || newexpenses < 0) {
      setError('Salary and expenses should be valid positive numbers.');
      return;
    }

    try {

      await user.addUser({
        userId : myUser.$id,
        name : myUser.name,
        email : myUser.email,
        phone,
        salary : newsalary,
        expenses : newexpenses
      });

      navigate('/');
    } 
    catch (error) {
      setError(`An error occurred during signup.`);
      console.error(`Error adding user:`, error);
    }
  }

  return (
    <Card className="mx-auto max-w-sm my-8">
      <CardHeader>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <CardTitle>Add Personal Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Phone Number</Label>
              <Input
              value = {phone}
              onChange = {handleChange('phone')} 
              id="phone" placeholder="+919876543210" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Your Salary (monthly)</Label>
              <Input
              value = {salary}
              onChange = {handleChange('salary')} 
              id="salary" placeholder="Rs. 10,000" />
            </div>
            <div>
              <Label htmlFor="name"> General expense  (monthly)</Label>
              <Input
              value = {expenses}
              onChange = {handleChange('expenses')}
              id="expenses" placeholder="Rs. 1,500" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
        onClick = {() => navigate('/')} 
        variant="outline">Skip</Button>
        <Button
        onClick = {handlePersonalData}
        >Continue</Button>
      </CardFooter>
    </Card>
  )
}

export default PersonalDetails