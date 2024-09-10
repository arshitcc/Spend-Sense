import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logout from './Logout';
import useAuthStore from '../app/mystore';

function Header() {

  const authStatus = useAuthStore((state) => state.authStatus)
  const navigate = useNavigate();
  
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
    <div className=''>
        <nav className="bg-white dark:bg-gray-900  w-full border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg" className="h-8" alt="Flowbite Logo" />
                </a>
            
                <div className="text-center w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {
                        navItems?.map((navItem) => (
                            navItem?.active ? 
                            (
                                <li key={navItem.name}>
                                    <button
                                    onClick={() => navigate(navItem.slug)}
                                    className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                    >{navItem.name}</button>
                                </li>
                            ) : null
                        ))
                    }
                    </ul>
                </div>

                {
                    authStatus && (
                        <Logout/>
                    )
                }
            </div>
        </nav>
    </div>

  )
}

export default Header