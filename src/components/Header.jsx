import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from './Logout';
import useAuthStore from '../app/mystore';


import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function Header() {

    const authStatus = useAuthStore((state) => state.authStatus)    
    const navItems = [
      {
          name : 'Home',
          slug : '/',
          active : true
      },
      {
          name : 'Add Transaction',
          slug : '/add',
          active : authStatus
      },
      {
          name : 'Login',
          slug : '/login',
          active : !authStatus
      },
      {
          name : 'Signup',
          slug : '/signup',
          active : !authStatus
      },
      {
          name : 'Contact',
          slug : '/contact',
          active : true
      },
    ]
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800">
      <NavLink to="https://tailwindcss.com" className="flex items-center gap-2" >
      <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg" className="h-6 w-6"/>
        <span className="text-lg flex lg:hidden font-normal">Expense-Tracker</span>
      </NavLink>
      <div className="hidden lg:flex gap-4">
        {
            navItems?.map((navItem) => (
                navItem?.active ? (
                    <NavLink
                        key={navItem.name}
                        to={navItem.slug}
                        className={({ isActive }) =>
                        `text-lg font-medium hover:underline underline-offset-4 ${
                            isActive ? '' : ''
                        }`
                        }
                    >
                        {navItem.name}
                    </NavLink>
                ) : null 
            ))
        }
      </div>
      
      
      <div className='flex items-center justify-between bg-white dark:bg-gray-800'>
        {
            authStatus && (
                <Logout/>
            )
        }

        <Sheet>
            <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Menu</span>
            </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="grid w-[200px] p-4">
                    {
                        navItems?.map((navItem) => (
                            navItem?.active ? (
                                <NavLink
                                    key={navItem.name}
                                    to={navItem.slug}
                                    className={({ isActive }) =>
                                    `text-lg font-medium hover:underline underline-offset-4 ${
                                        isActive ? '' : ''
                                    }`
                                    }
                                >
                                    {navItem.name}
                                </NavLink>
                            ) : null 
                        ))
                    }
                </div>
            </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}